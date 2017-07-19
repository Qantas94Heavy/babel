class Foo {}

class Point extends Foo {
  constructor(x = 0, y = 0) {
    super();

    _initialiseProps.call(this);

    this._private_class_x = +x;
    this._private_class_y = +y;
    this.test = 1;
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
  this._private_class_x = undefined;
  this._private_class_y = undefined;
};