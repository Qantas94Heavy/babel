var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Point = function (_Foo) {
  babelHelpers.inherits(Point, _Foo);

  function Point(...args) {
    var _this;

    babelHelpers.classCallCheck(this, Point);
    _this = babelHelpers.possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, ...args));
    _this._private_class_x = 0;
    _this._private_class_y = 0;
    return _this;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return this._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${this._private_class_x},${this._private_class_y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return this._private_class_x;
    },
    set: function (value) {
      this._private_class_x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return this._private_class_y;
    },
    set: function (value) {
      this._private_class_y = +value;
    }
  }]);
  return Point;
}(Foo);