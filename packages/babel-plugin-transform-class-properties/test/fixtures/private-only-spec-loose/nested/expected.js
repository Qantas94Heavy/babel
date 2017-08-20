class Point {
  constructor(x = 0, y = 0) {
    var _class, _temp, _private_class_wm2, _initialiseProps2;

    _initialiseProps.call(this);

    _private_class_wm.get(this).x = +x;
    _private_class_wm.get(this).y = +y;
    this.foo = (_temp = _class = class {
      constructor(x = 0, y = 0) {
        _initialiseProps2.call(this);

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

    }, _private_class_wm2 = new WeakMap(), _initialiseProps2 = function () {
      var _private_field_obj2 = {};

      _private_class_wm2.set(this, _private_field_obj2);

      _private_field_obj2.x = 1;
      _private_field_obj2.y = 2;
    }, _temp);
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

var _initialiseProps = function () {
  var _private_field_obj = {};

  _private_class_wm.set(this, _private_field_obj);

  _private_field_obj.x = 1;
  _private_field_obj.y = 2;
};
