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
  }

  getValues() {
    return [this._private_class_x, this.a, this._private_class_y, this.b];
  }

}

const values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);