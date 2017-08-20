var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x === babelHelpers.privateFieldsCheckNonSpec(p, "", "x")._private_class_x && babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y === babelHelpers.privateFieldsCheckNonSpec(p, "", "y")._private_class_y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x},${babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y}>`;
    }
  }, {
    key: "test",
    value: function test() {
      return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckNonSpec(this.constructor, "", "x")._private_class_x = +value;
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
}();

var _initialiseProps = function () {
  this.constructor._private_class_x = 1;
  this._private_class_y = 2;
};

var point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
