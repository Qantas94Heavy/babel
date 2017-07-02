var _private_class_wm = new WeakMap();

class Point {

  constructor(x = 0, y = 0) {
    var _private_class_wm2;

    _private_class_wm.set(this, {
      x: 1,
      y: 2
    });

    _private_class_wm.get(this).x = +x;
    _private_class_wm.get(this).y = +y;

    this.foo = (_private_class_wm2 = new WeakMap(), class {

      constructor(x = 0, y = 0) {
        _private_class_wm2.set(this, {
          x: 1,
          y: 2
        });

        _private_class_wm.get(this).x = +x;
        _private_class_wm.get(this).y = +y;
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
    });
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