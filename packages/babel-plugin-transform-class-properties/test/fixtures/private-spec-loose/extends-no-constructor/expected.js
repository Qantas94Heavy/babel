var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Point = function (_Foo) {
  babelHelpers.inherits(Point, _Foo);

  function Point(...args) {
    var _this;

    babelHelpers.classCallCheck(this, Point);
    _this = babelHelpers.possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, ...args));
    var _private_field_obj = {};

    _private_class_wm.set(_this, _private_field_obj);

    _private_field_obj.x = 0;
    _private_field_obj.y = 0;
    return _this;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return _private_class_wm.get(this).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${_private_class_wm.get(this).x},${_private_class_wm.get(this).y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return _private_class_wm.get(this).x;
    },
    set: function (value) {
      _private_class_wm.get(this).x = +value;
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
}(Foo);

var _private_class_wm = new WeakMap();