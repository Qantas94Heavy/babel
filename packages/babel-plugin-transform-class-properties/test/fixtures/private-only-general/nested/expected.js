class Point {
  constructor(x = 0, y = 0) {
    var _class, _temp, _initialiseProps2;

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
    this.foo = (_temp = _class = class {
      constructor(x = 0, y = 0) {
        _initialiseProps2.call(this);

        babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +x;
        babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
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

    }, _initialiseProps2 = function () {
      this._private_class2_x = 1;
      this._private_class2_y = 2;
    }, _temp);
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
  this._private_class_x = 1;
  this._private_class_y = 2;
};