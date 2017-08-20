class Foo {}

class Point extends Foo {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this._private_class_x = 0, this._private_class_y = 0, _temp;
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
