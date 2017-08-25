import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import syntaxClassProperties from "babel-plugin-syntax-class-properties";

export default function({ types: t }) {
  function createNonSpecPropName(prefix, name) {
    return `_private_class${prefix}_${name}`;
  }

  function PrivateName(path, state) {
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
    if (!validPrivateFieldNames.has(name)) {
      throw path.buildCodeFrameError(
        `Invalid private field reference '#${name}'`,
      );
    }

    const parentPath = path.parentPath;

    // The object the private field is (supposed to be) on.
    const object = parentPath.node.object;

    // In spec mode, private properties are fully encapsulated using WeakMap.
    if (state.opts.spec) {
      // We check the grandparent path as that is where the correct expression type will be.
      // AssignmentExpression/CallExpression -> MemberExpression -> PrivateName

      // "a.b.c.#x" -> "privateFieldsGetSpec(_private2, a.b.c, 'x')"
      parentPath.replaceWith(
        t.CallExpression(state.file.addHelper("privateFieldsGetSpec"), [
          privateSpecStoreId,
          object,
          t.StringLiteral(name),
        ]),
      );

      path.skip();
      parentPath.skip();
    } else {
      // In non-spec mode, we simply use prefixed property names on the instance.
      const ident = t.Identifier(
        createNonSpecPropName(privateNonSpecPrefix, name),
      );

      // If loose mode is enabled in non-spec mode, a TypeError will NOT be thrown upon
      // accessing an undefined object not caught statically.
      if (state.opts.loose) {
        path.replaceWith(ident);
      } else {
        // Make sure TypeError is thrown for access to non-existent private field.
        // TODO: This seems to be necessary so that this can remain as a valid LHS in an
        // AssignmentExpression, but surely there is some cleaner way of adding this?
        // If it is possible to check where it is being used as a reference and not a value, then
        // we could conditionally make this shorter.
        parentPath.replaceWith(
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
  }

  const methodVisitor = {
    PrivateName,
    AssignmentExpression(path, state) {
      const { privateSpecStoreId } = state;

      if (!state.opts.spec) return;
      if (path.node.operator === "=") {
        path.skip();
        const lhs = path.node.left;
        if (t.isMemberExpression(lhs) && t.isPrivateName(lhs.property)) {
          const name = lhs.property.name.name;

          // "a.b.c.#x = foo()" -> "privateFieldsSetSpec(_private2, a.b.c, 'x', foo())"
          path.replaceWith(
            t.CallExpression(state.file.addHelper("privateFieldsSetSpec"), [
              privateSpecStoreId,
              lhs.object,
              t.StringLiteral(name),
              path.node.right,
            ]),
          );

          path.get("callee").traverse(methodVisitor, state);
          for (const arg of path.get("arguments")) {
            arg.traverse(methodVisitor, state);
          }
        }

        path.skip();
      }
    },
    // Handle setting from ++ and -- according to spec.
    UpdateExpression(path, state) {
      const { privateSpecStoreId } = state;

      if (!state.opts.spec) return;

      path.skip();
      const lhs = path.node.argument;
      if (t.isMemberExpression(lhs) && t.isPrivateName(lhs.property)) {
        const name = lhs.property.name.name;

        // "a.b.c.#x = foo()" -> "privateFieldsSetSpec(_private2, a.b.c, 'x', foo())"
        path.replaceWith(
          t.CallExpression(
            state.file.addHelper(
              `privateFields${path.node.prefix ? "Pre" : "Post"}${path.node
                .operator === "++"
                ? "Inc"
                : "Dec"}`,
            ),
            [privateSpecStoreId, lhs.object, t.StringLiteral(name)],
          ),
        );

        path.get("argument").traverse(methodVisitor, state);
      }

      path.skip();
    },
    CallExpression(path, state) {
      const { privateSpecStoreId } = state;

      if (!state.opts.spec) return;

      path.skip();
      const lhs = path.node.callee;
      if (t.isMemberExpression(lhs) && t.isPrivateName(lhs.property)) {
        const name = lhs.property.name.name;

        // "a.b.c.#x(...args)" -> "privateFieldsCallSpec(privateLookup, a.b.c, 'x', args)"
        path.replaceWith(
          t.CallExpression(state.file.addHelper("privateFieldsCallSpec"), [
            privateSpecStoreId,
            lhs.object,
            t.StringLiteral(name),
            t.ArrayExpression(path.node.arguments),
          ]),
        );

        path.get("callee").traverse(methodVisitor, state);
        for (const arg of path.get("arguments")) {
          arg.traverse(methodVisitor, state);
        }
      }

      path.skip();
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

        for (const path of privateFieldPaths) {
          const node = path.node;
          const name = node.key.name;

          // Duplicate private field defintions are an early SyntaxError.
          if (validPrivateFieldNames.has(name)) {
            throw path.buildCodeFrameError(
              `Duplicate private field declaration '#${name}'`,
            );
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

        // Spec mode: Identifier for the private fields lookup object.
        const privateSpecStoreId = path.scope.generateUidIdentifier("private");

        // Non-spec mode: prefix for the private field class property.
        // We really only want the number.
        const privateNonSpecPrefix = path.scope
          .generateUid("")
          .replace("_", "");

        let instanceBody = [];

        if (privateFieldPaths.length > 0) {
          if (state.opts.spec) {
            // TODO: sometimes it appears this is not optimised out, even if we don't need it?
            // ^^^ Probably because it's being created in global scope, but how to avoid that?
            // Create an object to store weak maps for each private field name.
            // "var _private2 = Object.create(null);"
            nodes.push(
              t.VariableDeclaration("var", [
                t.VariableDeclarator(
                  privateSpecStoreId,
                  t.CallExpression(
                    t.MemberExpression(
                      t.Identifier("Object"),
                      t.Identifier("create"),
                    ),
                    [t.nullLiteral()],
                  ),
                ),
              ]),
            );

            // There needs to be weak maps to write private field values to.
            for (const name of validPrivateFieldNames) {
              // "_private2.x = new WeakMap();"
              nodes.push(
                t.ExpressionStatement(
                  t.AssignmentExpression(
                    "=",
                    t.MemberExpression(privateSpecStoreId, t.Identifier(name)),
                    t.newExpression(t.Identifier("WeakMap"), []),
                  ),
                ),
              );
            }
          }
        }

        for (const prop of props) {
          const propNode = prop.node;
          const isStatic = propNode.static;
          if (propNode.decorators && propNode.decorators.length > 0) continue;

          if (prop.isClassProperty()) {
            if (isStatic) {
              nodes.push(buildClassProperty(ref, propNode, path.scope));
            } else {
              instanceBody.push(
                buildClassProperty(t.thisExpression(), propNode, path.scope),
              );
            }
          } else if (prop.isClassPrivateProperty()) {
            // We have to specifically write "undefined" so that it is set.
            const rhs = propNode.value || path.scope.buildUndefinedNode();

            // We'll use "this.constructor" to refer back to the constructor
            // for static private fields.
            const target = isStatic
              ? t.MemberExpression(
                  t.ThisExpression(),
                  t.Identifier("constructor"),
                )
              : t.ThisExpression();

            if (state.opts.spec) {
              // "this.#foo = bar();" -> "_private.foo.set(this, bar());"
              instanceBody.push(
                t.ExpressionStatement(
                  t.CallExpression(
                    t.MemberExpression(
                      t.MemberExpression(
                        privateSpecStoreId,
                        t.Identifier(propNode.key.name),
                      ),
                      t.Identifier("set"),
                    ),
                    [target, rhs],
                  ),
                ),
              );
            } else {
              // "this.#foo = bar();" -> "this._private_class2_foo = bar();"
              const propName = t.Identifier(
                createNonSpecPropName(privateNonSpecPrefix, propNode.key.name),
              );

              instanceBody.push(
                t.ExpressionStatement(
                  t.AssignmentExpression(
                    "=",
                    t.MemberExpression(target, propName),
                    rhs,
                  ),
                ),
              );
            }
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
