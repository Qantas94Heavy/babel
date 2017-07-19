import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import syntaxClassProperties from "babel-plugin-syntax-class-properties";

export default function({ types: t }) {
  function createNonSpecPropName(prefix, name) {
    return `_private_class${prefix}_${name}`;
  }

  const methodVisitor = {
    PrivateName(path, state) {
      const {
        validPrivateFieldNames,
        privateSpecStoreId,
        privateNonSpecPrefix,
      } = state;

      // TODO: rename to something like path.node.id.name?
      const name = path.node.name.name;

      // References to PrivateNames which are not lexically present cause an early error.
      // This won't catch cases where it is used on an invalid object -- these are treated as
      // a runtime TypeError.
      // TODO: better error message?
      if (!validPrivateFieldNames.has(name)) {
        throw path.buildCodeFrameError(
          `Invalid private field reference '#${name}'`,
        );
      }

      // Handle case where #x shorthand is used.
      if (!path.parentPath.isMemberExpression()) {
        // "#x" -> "this.#x"
        path.replaceWith(t.MemberExpression(t.ThisExpression(), path.node));
        // Now path is referencing the newly created MemberExpression.
        // Change path to reference the PrivateName itself.
        path = path.get("property");
      }

      // The object the private field is (supposed to be) on.
      const object = path.parentPath.node.object;

      // In spec mode, private properties are fully encapsulated using WeakMap.
      // TODO: do we need to improve the error message?
      // An implicit TypeError is thrown if the private field cannot be found at runtime, but at
      // the moment the error would look like "Cannot read property 'x' of undefined".
      if (state.opts.spec) {
        let access;
        if (state.opts.loose) {
          // "a.b.c.#x" -> "privateLookup.get(a.b.c).x"
          access = t.CallExpression(
            t.MemberExpression(privateSpecStoreId, t.Identifier("get")),
            [object],
          );
        } else {
          // "a.b.c.#x" -> "privateFieldsCheckSpec(privateLookup, a.b.c, 'x').x"
          access = t.CallExpression(
            state.file.addHelper("privateFieldsCheckSpec"),
            [privateSpecStoreId, object, t.StringLiteral(name)],
          );
        }

        // Make sure that private methods are called with the correct this value. This is only an
        // issue in spec mode as we have a separate WeakMap object to store private fields.
        // "a.b.c.#x(...args)" -> "privateFieldsCheckSpec(privateLookup, a.b.c, 'x').x.apply(a.b.c, args)"
        // CallExpression -> MemberExpression -> PrivateName
        if (path.parentPath.parentPath.isCallExpression()) {
          access = t.MemberExpression(access, t.Identifier(name));

          // Replace parent properties with lookup to private field WeakMap.
          path.parentPath.get("object").replaceWith(access);

          path.replaceWith(t.Identifier("apply"));

          // "#(a, b, c)" -> "(correctThis, [a, b, c])"
          path.parentPath.parentPath.node.arguments = [
            object,
            t.ArrayExpression(path.parentPath.parentPath.node.arguments),
          ];
        } else {
          // Replace parent properties with lookup to private field WeakMap.
          path.parentPath.get("object").replaceWith(access);

          // Replace private name with standard identifer property.
          path.replaceWith(t.Identifier(name));
        }
      } else {
        // In non-spec mode, we simply use prefixed property names on the instance.
        const ident = t.Identifier(
          createNonSpecPropName(privateNonSpecPrefix, name),
        );

        if (state.opts.loose) {
          path.replaceWith(ident);
        } else {
          // Make sure TypeError is thrown for access to non-existent private field.
          // TODO: This seems to be necessary so that this can remain as a valid LHS in an
          // AssignmentExpression, but surely there is some cleaner way of adding this?
          // If it is possible to check where it is being used as a reference and not a value, then
          // we could conditionally make this shorter.
          path.parentPath.replaceWith(
            t.MemberExpression(
              t.CallExpression(
                state.file.addHelper("privateFieldsCheckNonSpec"),
                [
                  object,
                  t.StringLiteral(privateNonSpecPrefix),
                  t.StringLiteral(name),
                ],
              ),
              ident,
            ),
          );
        }
      }
    },
  };

  const findBareSupers = {
    Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    },
  };

  const referenceVisitor = {
    TypeAnnotation(path) {
      path.skip();
    },
    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.collision = true;
        path.skip();
      }
    },
  };

  const buildObjectDefineProperty = template(`
    Object.defineProperty(REF, KEY, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: VALUE
    });
  `);

  const buildClassPropertySpec = (ref, { key, value, computed }, scope) =>
    buildObjectDefineProperty({
      REF: ref,
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value ? value : scope.buildUndefinedNode(),
    });

  const buildClassPropertyLoose = (ref, { key, value, computed }, scope) =>
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value ? value : scope.buildUndefinedNode(),
      ),
    );

  return {
    inherits: syntaxClassProperties,

    visitor: {
      Class(path, state) {
        const buildClassProperty = state.opts.loose
          ? buildClassPropertyLoose
          : buildClassPropertySpec;
        const isDerived = !!path.node.superClass;
        let constructor;
        const props = [];
        const privateFieldPaths = [];
        const methods = [];
        const body = path.get("body");

        for (const path of body.get("body")) {
          if (path.isClassPrivateProperty()) {
            privateFieldPaths.push(path);
            props.push(path);
          } else if (path.isClassProperty()) {
            props.push(path);
          } else if (path.isClassMethod()) {
            methods.push(path);

            if (path.node.kind === "constructor") {
              constructor = path;
            }
          }
        }

        // Allow us to check whether a private field declaration is duplicate or not.
        const validPrivateFieldNames = new Set();
        let hasStaticPrivateFields = false;

        for (const path of privateFieldPaths) {
          const node = path.node;
          const name = node.key.name;

          // Duplicate private field defintions are an early SyntaxError.
          if (validPrivateFieldNames.has(name)) {
            throw path.buildCodeFrameError(
              `Duplicate private field declaration '#${name}'`,
            );
          }

          if (node.static) {
            hasStaticPrivateFields = true;
          }

          validPrivateFieldNames.add(name);
        }

        // TODO: check this condition
        if (!props.length && !privateFieldPaths.length) return;

        const nodes = [];
        let ref;

        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          // path.isClassDeclaration() && path.node.id
          ref = path.node.id;
        }

        // Spec mode: Identifier for the WeakMap lookup object.
        let privateSpecStoreId;

        const privateFieldObjRef = path.scope.generateUidIdentifier(
          "private_field_obj",
        );

        const privateFieldStaticObjRef = path.scope.generateUidIdentifier(
          "private_field_" + ref.name,
        );

        // Non-spec mode: prefix for the private field class property.
        let privateNonSpecPrefix;

        let instanceBody = [];

        if (privateFieldPaths.length > 0) {
          if (state.opts.spec) {
            // Create WeakMap object for spec mode.
            privateSpecStoreId = path.scope.generateUidIdentifier(
              "private_class_wm",
            );

            // TODO: sometimes it appears this is not optimised out, even if we don't need it?
            // ^^^ Probably because it's being created in global scope, but how to avoid that?
            // Create the private field WeakMap.
            nodes.push(
              t.VariableDeclaration("var", [
                t.VariableDeclarator(
                  privateSpecStoreId,
                  t.NewExpression(t.Identifier("WeakMap"), []),
                ),
              ]),
            );

            // There needs to be an object to write private field values to.
            // Reference the private field object so we don't have to get it multiple times.
            // "var private_field_obj3 = {};"
            instanceBody.push(
              t.VariableDeclaration("var", [
                t.VariableDeclarator(
                  privateFieldObjRef,
                  t.ObjectExpression([]),
                ),
              ]),
            );

            // "privateLookup.set(this, private_field_obj3);"
            instanceBody.push(
              t.ExpressionStatement(
                t.CallExpression(
                  t.MemberExpression(privateSpecStoreId, t.Identifier("set")),
                  [t.ThisExpression(), privateFieldObjRef],
                ),
              ),
            );

            if (hasStaticPrivateFields) {
              // "var private_field_static_obj4 = {};"
              nodes.push(
                t.VariableDeclaration("var", [
                  t.VariableDeclarator(
                    privateFieldStaticObjRef,
                    t.ObjectExpression([]),
                  ),
                ]),
              );

              // "privateLookup.set(MyClass, private_field_static_obj4);"
              nodes.push(
                t.ExpressionStatement(
                  t.CallExpression(
                    t.MemberExpression(privateSpecStoreId, t.Identifier("set")),
                    [ref, privateFieldStaticObjRef],
                  ),
                ),
              );
            }
          } else {
            // We really only want the number.
            privateNonSpecPrefix = path.scope.generateUid("").replace("_", "");
          }
        }

        for (const prop of props) {
          const propNode = prop.node;
          if (propNode.decorators && propNode.decorators.length > 0) continue;

          if (prop.isClassProperty()) {
            const isStatic = propNode.static;

            if (isStatic) {
              nodes.push(buildClassProperty(ref, propNode, path.scope));
            } else {
              instanceBody.push(
                buildClassProperty(t.thisExpression(), propNode, path.scope),
              );
            }
          } else if (prop.isClassPrivateProperty()) {
            let lhs;
            if (state.opts.spec) {
              // "#foo = bar();" -> "private_field_obj3.foo = bar();"
              // We have to specifically write "undefined" so that it is set.
              lhs = t.MemberExpression(
                propNode.static ? privateFieldStaticObjRef : privateFieldObjRef,
                t.Identifier(propNode.key.name),
              );
            } else {
              // "#foo = bar();" -> "this._private_class2_foo = bar();"
              // It is necessary to set this even if there is no initial value.
              const target = propNode.static
                ? t.MemberExpression(
                    t.ThisExpression(),
                    t.Identifier("constructor"),
                  )
                : t.ThisExpression();

              lhs = t.MemberExpression(
                target,
                t.Identifier(
                  createNonSpecPropName(
                    privateNonSpecPrefix,
                    propNode.key.name,
                  ),
                ),
              );
            }

            instanceBody.push(
              t.ExpressionStatement(
                t.AssignmentExpression(
                  "=",
                  lhs,
                  propNode.value || path.scope.buildUndefinedNode(),
                ),
              ),
            );
          } else {
            throw new Error("Internal error: unexpected property type");
          }
        }

        if (instanceBody.length) {
          if (!constructor) {
            const newConstructor = t.classMethod(
              "constructor",
              t.identifier("constructor"),
              [],
              t.blockStatement([]),
            );
            if (isDerived) {
              newConstructor.params = [t.restElement(t.identifier("args"))];
              newConstructor.body.body.push(
                t.returnStatement(
                  t.callExpression(t.super(), [
                    t.spreadElement(t.identifier("args")),
                  ]),
                ),
              );
            }
            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          const collisionState = {
            collision: false,
            scope: constructor.scope,
          };

          for (const prop of props) {
            prop.traverse(referenceVisitor, collisionState);
            if (collisionState.collision) break;
          }

          if (collisionState.collision) {
            const initialisePropsRef = path.scope.generateUidIdentifier(
              "initialiseProps",
            );

            nodes.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  initialisePropsRef,
                  t.functionExpression(
                    null,
                    [],
                    t.blockStatement(instanceBody),
                  ),
                ),
              ]),
            );

            instanceBody = [
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(initialisePropsRef, t.identifier("call")),
                  [t.thisExpression()],
                ),
              ),
            ];
          }

          // Any references to "this" must be placed after the call to super().
          if (isDerived) {
            const bareSupers = [];
            constructor.traverse(findBareSupers, bareSupers);
            for (const bareSuper of bareSupers) {
              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        // Replace references to private fields in this class.
        for (const method of methods) {
          method.traverse(methodVisitor, {
            validPrivateFieldNames,
            privateSpecStoreId,
            privateNonSpecPrefix,
            opts: state.opts,
            file: state.file,
          });
        }

        // The class (private) property declarations shouldn't be included in the transformed class.
        for (const prop of props) {
          prop.remove();
        }

        if (!nodes.length) return;

        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(t.assignmentExpression("=", ref, path.node));
        } else {
          // path.isClassDeclaration()
          if (!path.node.id) {
            path.node.id = ref;
          }

          if (path.parentPath.isExportDeclaration()) {
            path = path.parentPath;
          }
        }

        path.insertAfter(nodes);
      },
      ArrowFunctionExpression(path) {
        const classExp = path.get("body");
        if (!classExp.isClassExpression()) return;

        const body = classExp.get("body");
        const members = body.get("body");
        if (members.some(member => member.isClassProperty())) {
          path.ensureBlock();
        }
      },
    },
  };
}
