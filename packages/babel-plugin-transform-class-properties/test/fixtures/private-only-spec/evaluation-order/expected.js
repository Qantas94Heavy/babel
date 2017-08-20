let i = 0;

function increment() {
  return i++;
}

class Point {
  constructor() {
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.x = increment();
    Object.defineProperty(this, "a", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: increment()
    });
    _private_field_obj.y = increment();
    Object.defineProperty(this, "b", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: increment()
    });
    this.c = increment();
  }

  getValues() {
    return [babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x, this.a, babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y, this.b, this.c];
  }

}

var _private_class_wm = new WeakMap();

const values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);
assert.strictEqual(values[4], 4);
const values2 = new Point().getValues();
assert.strictEqual(values2[0], 5);
assert.strictEqual(values2[1], 6);
assert.strictEqual(values2[2], 7);
assert.strictEqual(values2[3], 8);
assert.strictEqual(values2[4], 9);
