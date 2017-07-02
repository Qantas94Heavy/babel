class Foo {}

var _private_class_wm = new WeakMap();

class Point extends Foo {

  constructor(x = 0, y = 0) {
    super();

    _private_class_wm.set(this, {
      x: undefined,
      y: undefined
    });

    _private_class_wm.get(this).x = +x;
    _private_class_wm.get(this).y = +y;

    this.test = 1;
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