class Point {
  constructor(x = 0, y = 0) {
    _initialiseProps.call(this);

    babelHelpers.privateFieldsSetSpec(_private, this.constructor, "x", +x);
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +y);
  }

  get x() {
    return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x");
  }

  set x(value) {
    babelHelpers.privateFieldsSetSpec(_private, this.constructor, "x", +value);
  }

  get y() {
    return babelHelpers.privateFieldsGetSpec(_private, this, "y");
  }

  set y(value) {
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +value);
  }

  equals(p) {
    return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
  }

  test() {
    return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x");
  }

}

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();

var _initialiseProps = function () {
  _private.x.set(this.constructor, 1);

  _private.y.set(this, 2);
};

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
