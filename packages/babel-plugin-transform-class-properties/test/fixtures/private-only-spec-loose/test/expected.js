class Point {
  constructor(x = 0, y = 0) {
    _initialiseProps.call(this);

    _private_class_wm.get(this.constructor).x = +x;
    _private_class_wm.get(this).y = +y;
  }

  get x() {
    return _private_class_wm.get(this.constructor).x;
  }

  set x(value) {
    _private_class_wm.get(this.constructor).x = +value;
  }

  get y() {
    return _private_class_wm.get(this).y;
  }

  set y(value) {
    _private_class_wm.get(this).y = +value;
  }

  equals(p) {
    return _private_class_wm.get(this.constructor).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
  }

  toString() {
    return `Point<${_private_class_wm.get(this).x},${_private_class_wm.get(this).y}>`;
  }

  test() {
    return _private_class_wm.get(this.constructor).x;
  }

}

var _private_class_wm = new WeakMap();

var _private_field_Point = {};

_private_class_wm.set(Point, _private_field_Point);

var _initialiseProps = function () {
  var _private_field_obj = {};

  _private_class_wm.set(this, _private_field_obj);

  _private_field_Point.x = 1;
  _private_field_obj.y = 2;
};

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);