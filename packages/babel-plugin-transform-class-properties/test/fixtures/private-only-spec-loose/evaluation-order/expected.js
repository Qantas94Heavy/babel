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

  getValues() {
    return [_private_class_wm.get(this).x, this.a, _private_class_wm.get(this).y, this.b];
  }

}

var _private_class_wm = new WeakMap();

const values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);