class Point {
  constructor(x = 0, y = 0) {
    _initialiseProps.call(this);

    this.constructor._private_class_x = +x;
    this._private_class_y = +y;
  }

  get x() {
    return this.constructor._private_class_x;
  }

  set x(value) {
    this.constructor._private_class_x = +value;
  }

  get y() {
    return this._private_class_y;
  }

  set y(value) {
    this._private_class_y = +value;
  }

  equals(p) {
    return this.constructor._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
  }

  toString() {
    return `Point<${this.constructor._private_class_x},${this._private_class_y}>`;
  }

  test() {
    return this.constructor._private_class_x;
  }

}

var _initialiseProps = function () {
  this.constructor._private_class_x = 1;
  this._private_class_y = 2;
};

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
