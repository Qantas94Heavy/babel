class Point {
  constructor(x = 0, y = 0) {
    var _class, _temp, _initialiseProps2;

    _initialiseProps.call(this);

    this._private_class_x = +x;
    this._private_class_y = +y;
    this.foo = (_temp = _class = class {
      constructor(x = 0, y = 0) {
        _initialiseProps2.call(this);

        this._private_class_x = +x;
        this._private_class_y = +y;
      }

      get x() {
        return this._private_class_x;
      }

      set x(value) {
        this._private_class_x = +value;
      }

      get y() {
        return this._private_class_y;
      }

      set y(value) {
        this._private_class_y = +value;
      }

      equals(p) {
        return this._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
      }

      toString() {
        return `Point<${this._private_class_x},${this._private_class_y}>`;
      }

    }, _initialiseProps2 = function () {
      this._private_class2_x = 1;
      this._private_class2_y = 2;
    }, _temp);
  }

  get x() {
    return this._private_class_x;
  }

  set x(value) {
    this._private_class_x = +value;
  }

  get y() {
    return this._private_class_y;
  }

  set y(value) {
    this._private_class_y = +value;
  }

  equals(p) {
    return this._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
  }

  toString() {
    return `Point<${this._private_class_x},${this._private_class_y}>`;
  }

}

var _initialiseProps = function () {
  this._private_class_x = 1;
  this._private_class_y = 2;
};