var i = 0;

function increment() {
  return i++;
}

var Point = function () {
  function Point() {
    babelHelpers.classCallCheck(this, Point);
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.x = increment();
    this.a = increment();
    _private_field_obj.y = increment();
    this.b = increment();
    this.c = increment();
  }

  babelHelpers.createClass(Point, [{
    key: "getValues",
    value: function getValues() {
      return [_private_class_wm.get(this).x, this.a, _private_class_wm.get(this).y, this.b, this.c];
    }
  }]);
  return Point;
}();

var _private_class_wm = new WeakMap();

var values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);
assert.strictEqual(values[4], 4);
var values2 = new Point().getValues();
assert.strictEqual(values2[0], 5);
assert.strictEqual(values2[1], 6);
assert.strictEqual(values2[2], 7);
assert.strictEqual(values2[3], 8);
assert.strictEqual(values2[4], 9);
