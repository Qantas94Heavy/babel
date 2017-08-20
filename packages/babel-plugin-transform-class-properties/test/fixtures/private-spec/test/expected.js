var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x = +x;
    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +y;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "x").x && babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "y").y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x},${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y}>`;
    }
  }, {
    key: "test",
    value: function test() {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this.constructor, "x").x = +value;
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
