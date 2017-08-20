var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    _private_class_wm.get(this.constructor).x = +x;
    _private_class_wm.get(this).y = +y;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return _private_class_wm.get(this.constructor).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${_private_class_wm.get(this.constructor).x},${_private_class_wm.get(this).y}>`;
    }
  }, {
    key: "test",
    value: function test() {
      return _private_class_wm.get(this.constructor).x;
    }
  }, {
    key: "x",
    get: function () {
      return _private_class_wm.get(this.constructor).x;
    },
    set: function (value) {
      _private_class_wm.get(this.constructor).x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return _private_class_wm.get(this).y;
    },
    set: function (value) {
      _private_class_wm.get(this).y = +value;
    }
  }]);
  return Point;
}();

var _private_class_wm = new WeakMap();

var _private_field_Point = {};

_private_class_wm.set(Point, _private_field_Point);

var _initialiseProps = function () {
  var _private_field_obj = {};

  _private_class_wm.set(this, _private_field_obj);

  _private_field_Point.x = 1;
  _private_field_obj.y = 2;
};

var point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
