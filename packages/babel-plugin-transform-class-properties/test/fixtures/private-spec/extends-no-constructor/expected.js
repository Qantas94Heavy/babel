var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Point = function (_Foo) {
  babelHelpers.inherits(Point, _Foo);

  function Point(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Point);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, ...args)), _private.x.set(_this, 0), _private.y.set(_this, 0), _temp));
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsGetSpec(_private, this, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsGetSpec(_private, this, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsGetSpec(_private, this, "x");
    },
    set: function (value) {
      babelHelpers.privateFieldsSetSpec(_private, this, "x", +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateFieldsGetSpec(_private, this, "y");
    },
    set: function (value) {
      babelHelpers.privateFieldsSetSpec(_private, this, "y", +value);
    }
  }]);
  return Point;
}(Foo);

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();
