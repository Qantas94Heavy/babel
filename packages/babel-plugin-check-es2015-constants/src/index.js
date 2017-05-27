import * as t from "babel-types";

let i = 0;
export default function ({ messages }) {
  return {
    visitor: {
      Scope(path, state) {
        const { scope } = path;
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (const violation of (binding.constantViolations: Array)) {
            violation.parentPath.insertBefore(t.throwStatement(
              t.newExpression(t.identifier("ReferenceError"), [
                t.stringLiteral(messages.get("readOnly", name)),
              ])
            ));
            //throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      },
    },
  };
}
