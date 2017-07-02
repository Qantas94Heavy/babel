var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x = +x;
    babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y = +y;
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
}();

var _initialiseProps = function () {
  this._private_class_x = undefined;
  this._private_class_y = undefined;
};

var a = new Point();
assert.throws(function () {
  a.equals({});
});