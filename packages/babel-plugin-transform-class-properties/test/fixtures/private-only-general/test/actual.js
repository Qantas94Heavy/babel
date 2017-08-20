class Point {
  static #x = 1;
  #y = 2;

  constructor(x = 0, y = 0) {
    this.constructor.#x = +x;
    this.#y = +y;
  }

  get x() { return this.constructor.#x }
  set x(value) { this.constructor.#x = +value }

  get y() { return this.#y }
  set y(value) { this.#y = +value }

  equals(p) { return this.constructor.#x === p.#x && this.#y === p.#y }

  toString() { return `Point<${ this.constructor.#x },${ this.#y }>` }

  test() { return this.constructor.#x; }
}

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
