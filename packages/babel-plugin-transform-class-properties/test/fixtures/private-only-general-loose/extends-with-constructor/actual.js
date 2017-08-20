class Foo {}

class Point extends Foo {
    #x;
    #y;

    constructor(x = 0, y = 0) {
      super();
      this.#x = +x;
      this.#y = +y;

      this.test = 1;
    }

    get x() { return this.#x }
    set x(value) { this.#x = +value }

    get y() { return this.#y }
    set y(value) { this.#y = +value }

    equals(p) { return this.#x === p.#x && this.#y === p.#y }

    toString() { return `Point<${ this.#x },${ this.#y }>` }
}
