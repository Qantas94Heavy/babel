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
    Object.defineProperty(this, "a", {
      enumerable: true,
      writable: true,
      value: increment()
    });
    _private_field_obj.y = increment();
    Object.defineProperty(this, "b", {
      enumerable: true,
      writable: true,
      value: increment()
    });
  }

  babelHelpers.createClass(Point, [{
    key: "getValues",
    value: function getValues() {
      return [babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x, this.a, babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y, this.b];
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