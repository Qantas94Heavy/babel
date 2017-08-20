let i = 0;

function increment() {
  return i++;
}

class Point {
  constructor() {
    this._private_class_x = increment();
    this.a = increment();
    this._private_class_y = increment();
    this.b = increment();
    this.c = increment();
  }

  getValues() {
    return [this._private_class_x, this.a, this._private_class_y, this.b, this.c];
  }

}

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
