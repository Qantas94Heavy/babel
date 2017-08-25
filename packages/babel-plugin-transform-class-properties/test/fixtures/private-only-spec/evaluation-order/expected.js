let i = 0;

function increment() {
  return i++;
}

class Point {
  constructor() {
    _private.x.set(this, increment());

    Object.defineProperty(this, "a", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: increment()
    });

    _private.y.set(this, increment());

    Object.defineProperty(this, "b", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: increment()
    });
    this.c = increment();
  }

  getValues() {
    return [babelHelpers.privateFieldsGetSpec(_private, this, "x"), this.a, babelHelpers.privateFieldsGetSpec(_private, this, "y"), this.b, this.c];
  }

}

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();
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
