let i = 0;
function increment() {
  return i++;
}

class Point {
    #x = increment();
    a  = increment();
    #y = increment();
    b  = increment();

    constructor() {}

    getValues() {
        return [ #x, this.a, #y, this.b ];
    }
}

const values = new Point().getValues();
assert.strictEqual(values[0], 0);
assert.strictEqual(values[1], 1);
assert.strictEqual(values[2], 2);
assert.strictEqual(values[3], 3);
