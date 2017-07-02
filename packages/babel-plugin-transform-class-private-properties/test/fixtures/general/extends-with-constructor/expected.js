var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Point = function (_Foo) {
  babelHelpers.inherits(Point, _Foo);

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    var _this = babelHelpers.possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

    _this._private_class_x = undefined;
    _this._private_class_y = undefined;

    babelHelpers.privateFieldsCheckNonSpec(_this, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(_this, "", "y")._private_class_y = +y;

    _this.test = 1;
    return _this;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x === babelHelpers.privateFieldsCheckNonSpec(p, "", "x")._private_class_x && babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y === babelHelpers.privateFieldsCheckNonSpec(p, "", "y")._private_class_y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x},${babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +value;
    }
  }]);
  return Point;
}(Foo);