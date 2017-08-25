class Foo {}

class Point extends Foo {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _private.x.set(this, 0), _private.y.set(this, 0), _temp;
  }

  get x() {
    return babelHelpers.privateFieldsGetSpec(_private, this, "x");
  }

  set x(value) {
    babelHelpers.privateFieldsSetSpec(_private, this, "x", +value);
  }

  get y() {
    return babelHelpers.privateFieldsGetSpec(_private, this, "y");
  }

  set y(value) {
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +value);
  }

  equals(p) {
    return babelHelpers.privateFieldsGetSpec(_private, this, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsGetSpec(_private, this, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
  }

}

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();
