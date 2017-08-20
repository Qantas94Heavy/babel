class Point {
  constructor(x = 0, y = 0) {
    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
  }

  get x() {
    return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x;
  }

  set x(value) {
    babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x = +value;
  }

  get y() {
    return babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y;
  }

  set y(value) {
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +value;
  }

  equals(p) {
    return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x === babelHelpers.privateFieldsCheckNonSpec(p, "", "x")._private_class_x && babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y === babelHelpers.privateFieldsCheckNonSpec(p, "", "y")._private_class_y;
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x},${babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y}>`;
  }

  test() {
    return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x;
  }

}

var _initialiseProps = function () {
  this.constructor._private_class_x = 1;
  this._private_class_y = 2;
};

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
