var i = 0;

function increment() {
  return i++;
}

var Point = function () {
  function Point() {
    babelHelpers.classCallCheck(this, Point);
    this._private_class_x = increment();
    this.a = increment();
    this._private_class_y = increment();
    this.b = increment();
  }

  babelHelpers.createClass(Point, [{
    key: "getValues",
    value: function getValues() {
      return [babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x, this.a, babelHelpers.privateFieldsCheckNonSpec(this, "", "y")._private_class_y, this.b];
    }
  }]);
  return Point;
}();

var values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);