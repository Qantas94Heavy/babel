var Foo = function Foo() {
  babelHelpers.classCallCheck(this, Foo);
};

var Point = function (_Foo) {
  babelHelpers.inherits(Point, _Foo);

  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    var _this = babelHelpers.possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

    _initialiseProps.call(_this);

    babelHelpers.privateFieldsCheckSpec(_private_class_wm, _this, "x").x = +x;
    babelHelpers.privateFieldsCheckSpec(_private_class_wm, _this, "y").y = +y;
    _this.test = 1;
    return _this;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "x").x && babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "y").y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x},${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +value;
    }
  }]);
  return Point;
}(Foo);

var _private_class_wm = new WeakMap();

var _initialiseProps = function () {
  var _private_field_obj = {};

  _private_class_wm.set(this, _private_field_obj);

  _private_field_obj.x = undefined;
  _private_field_obj.y = undefined;
};