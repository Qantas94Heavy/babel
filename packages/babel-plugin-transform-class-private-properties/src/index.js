import syntaxClassPrivateProperties from "babel-plugin-syntax-class-private-properties";

export default function ({ types: t }) {
  function createNonSpecPropName(prefix, name) {
    return "_private_class" + prefix + "_" + name;
  }

  const methodVisitor = {
    PrivateName(path, state) {
      const { privateFieldNames, spec, privateSpecStoreId, privateNonSpecPrefix } = state;

      // TODO: rename to something like path.node.id.name?
      const name = path.node.name.name;

      // References to PrivateNames which are not lexically present cause an early error.
      // This won't catch cases where it is used on an invalid object -- these are treated as
      // a runtime TypeError.
      // TODO: better error message?
      if (!(name in privateFieldNames)) {
        throw path.buildCodeFrameError(
          `Invalid private field reference '#${name}'`
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
      if (spec) {
        // "a.b.c.#x" -> "privateLookup.get(a.b.c).x"
        // All parent property lookups are in the left object of the MemberExpression, i.e.
        // ME(a.b.c, #x)
        let access = t.CallExpression(
          t.MemberExpression(privateSpecStoreId, t.Identifier("get")),
          [ object ]
        );

        // Make sure that private methods are called with the correct this value. This is only an
        // issue in spec mode as we have a separate WeakMap object to store private fields.
        // "a.b.c.#x(...args)" -> "privateLookup.get(a.b.c).#x.apply(a.b.c, args)"
        // CallExpression -> MemberExpression -> PrivateName
        if (path.parentPath.parentPath.isCallExpression()) {
          access = t.MemberExpression(access, t.Identifier(name));

          // Replace parent properties with lookup to private field WeakMap.
          path.parentPath.get("object").replaceWith(access);

          path.replaceWith(t.Identifier("apply"));

          // "#(a, b, c)" -> "(correctThis, [a, b, c])"
          path.parentPath.parentPath.node.arguments = [
            object,
            t.ArrayExpression(path.parentPath.parentPath.node.arguments)
          ];
        } else {
          // Replace parent properties with lookup to private field WeakMap.
          path.parentPath.get("object").replaceWith(access);

          // Replace private name with standard identifer property.
          path.replaceWith(t.Identifier(name));
        }
      }
      // In non-spec mode, we simply use prefixed property names on the instance.
      else {
        const ident = t.Identifier(createNonSpecPropName(privateNonSpecPrefix, name));

        // Make sure TypeError is thrown for access to non-existent private field.
        // TODO: This seems to be necessary so that this can remain as a valid LHS in an
        // AssignmentExpression, but surely there is some cleaner way of adding this?
        // If it is possible to check where it is being used as a reference and not a value, then
        // we could conditianally make this shorter.
        path.parentPath.replaceWith(t.MemberExpression(
          t.CallExpression(
            state.file.addHelper("privateFieldsCheckNonSpec"),
            [ object, t.StringLiteral(privateNonSpecPrefix), t.StringLiteral(name) ]
          ),
          ident
        ));
      }
    }
  };

  const bareSuperCallVisitor = {
    Super(path, state) {
      // This must be a direct "super(...)" call, not "super.foo" or "super.bar()".
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        // ExpressionStatement -> CallExpression -> Super
        path.parentPath.parentPath.insertAfter(state.initialiser);
      }
    }
  };

  return {
    inherits: syntaxClassPrivateProperties,

    visitor: {
      Class(path, state) {
        const body = path.get("body");
        const privateFieldDefs = [];
        const methods = [];
        let constructor;

        for (const path of body.get("body")) {
          if (path.isClassPrivateProperty()) {
            privateFieldDefs.push(path);
          } else if (path.isClassMethod()) {
            methods.push(path);

            if (path.node.kind === "constructor") {
              constructor = path;
            }
          }
        }

        // Allow us to check whether a private field declaration is duplicate or not.
        const privateFieldNames = Object.create(null);

        for (const def of privateFieldDefs) {
          const { node } = def;
          const name = node.key.name;

          // Duplicate private field defintions are an early SyntaxError.
          if (name in privateFieldNames) {
            throw def.buildCodeFrameError(
              `Duplicate private field declaration '#${name}'`
            );
          }

          privateFieldNames[name] = node.value;

          // TODO: is this necessary/right?
          def.remove();
        }


        const isDerived = !!path.node.superClass;

        if (privateFieldDefs.length > 0) {
          // Create constructor method if it does not exist yet.
          if (!constructor) {
            const newConstructor = t.classMethod("constructor", t.identifier("constructor"), [],
            t.blockStatement([]));

            // Add call to "super()" so that "this" can be accessed in the constructor.
            if (isDerived) {
              newConstructor.params = [t.restElement(t.identifier("args"))];
              newConstructor.body.body.push(t.expressionStatement(
                t.callExpression(
                  t.super(),
                  [t.spreadElement(t.identifier("args"))]
                )
              ));
            }
            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          // Spec mode: Identifier for the WeakMap lookup object.
          let privateSpecStoreId;

          // Non-spec mode: prefix for the private field class property.
          let privateNonSpecPrefix;

          // Statements to initialise the private fields for a class instance.
          let initialiser;

          if (state.opts.spec) {
            // Create WeakMap object for spec mode.
            privateSpecStoreId = path.scope.generateUidIdentifier("private_class_wm");

            // TODO: sometimes it appears this is not optimised out, even if we don't need it?
            // ^^^ Probably because it's being created in global scope, but how to avoid that?
            path.insertBefore(t.VariableDeclaration("var", [
              t.VariableDeclarator(
                privateSpecStoreId,
                t.NewExpression(t.Identifier("WeakMap"), [])
              ),
            ]));

            const privateFieldsAst = [];

            // We have to specifically write "undefined" so that it is set.
            for (const name in privateFieldNames) {
              const value = privateFieldNames[name];
              privateFieldsAst.push(
                t.ObjectProperty(t.Identifier(name), value || t.Identifier("undefined"))
              );
            }

            // "privateLookup.set(this, { /* private field initial values */ });"
            initialiser = t.ExpressionStatement(
              t.CallExpression(
                t.MemberExpression(privateSpecStoreId, t.Identifier("set")),
                [ t.ThisExpression(), t.ObjectExpression(privateFieldsAst) ]
              )
            );
          } else {
            // We really only want the number.
            privateNonSpecPrefix = path.scope.generateUid("").replace("_", "");

            initialiser = [];
            for (const name in privateFieldNames) {
              const value = privateFieldNames[name];
              // "this._private_class2_name = someValue();"
              // It is necessary to set this even if there is no initial value.
              initialiser.push(t.ExpressionStatement(
                t.AssignmentExpression(
                  "=",
                  t.MemberExpression(
                    t.ThisExpression(),
                    t.Identifier(createNonSpecPropName(privateNonSpecPrefix, name))
                  ),
                  value || t.Identifier("undefined")
                )
              ));
            }
          }

          // Insert private field initialisers after the "super()" call (if one exists).
          if (isDerived) {
            constructor.traverse(bareSuperCallVisitor, { initialiser });
          } else {
            constructor.get("body").unshiftContainer("body", initialiser);
          }
        }

        for (const method of methods) {
          method.traverse(methodVisitor, {
            privateFieldNames,
            privateSpecStoreId,
            privateNonSpecPrefix,
            spec: state.opts.spec,
            file: state.file,
          });
        }
      },
    },
  };
}
