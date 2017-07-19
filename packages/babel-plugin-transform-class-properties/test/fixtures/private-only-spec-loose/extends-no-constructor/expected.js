class Foo {}

class Point extends Foo {
  constructor(...args) {
    super(...args);
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.x = 0;
    _private_field_obj.y = 0;
  }

  get x() {
    return _private_class_wm.get(this).x;
  }

  set x(value) {
    _private_class_wm.get(this).x = +value;
  }

  get y() {
    return _private_class_wm.get(this).y;
  }

  set y(value) {
    _private_class_wm.get(this).y = +value;
  }

  equals(p) {
    return _private_class_wm.get(this).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
  }

  toString() {
    return `Point<${_private_class_wm.get(this).x},${_private_class_wm.get(this).y}>`;
  }

}

var _private_class_wm = new WeakMap();