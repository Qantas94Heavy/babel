class Foo {}

class Point extends Foo {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this._private_class_x = 0, this._private_class_y = 0, _temp;
  }

  get x() {
    return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x;
  }

  set x(value) {
    babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +value;
  }

  get y() {
    return babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y;
  }

  set y(value) {
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +value;
  }

  equals(p) {
    return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x === babelHelpers.privateFieldsCheckNonSpec(p, "", "x")._private_class_x && babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y === babelHelpers.privateFieldsCheckNonSpec(p, "", "y")._private_class_y;
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x},${babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y}>`;
  }

}
