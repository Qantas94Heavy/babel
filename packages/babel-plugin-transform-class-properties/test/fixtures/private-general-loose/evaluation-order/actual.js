let i = 0;
function increment() {
  return i++;
}

class Point {
  #x = increment();
  a  = increment();

  constructor() {
    this.c = increment();
  }

  #y = increment();
  b  = increment();

  getValues() {
    return [ this.#x, this.a, this.#y, this.b, this.c ];
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
