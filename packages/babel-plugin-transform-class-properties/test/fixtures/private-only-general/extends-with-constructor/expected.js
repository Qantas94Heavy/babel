class Foo {}

class Point extends Foo {
  constructor(x = 0, y = 0) {
    super();

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
    this.test = 1;
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

var _initialiseProps = function () {
  this._private_class_x = void 0;
  this._private_class_y = void 0;
};