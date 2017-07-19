class Point {
    static #x = 1;
    #y = 2;

    constructor(x = 0, y = 0) {
        this.constructor.#x = +x;
        #y = +y;
    }

    get x() { return this.constructor.#x }
    set x(value) { this.constructor.#x = +value }

    get y() { return #y }
    set y(value) { #y = +value }

    equals(p) { return this.constructor.#x === p.#x && #y === p.#y }

    toString() { return `Point<${ #x },${ #y }>` }

    test() { return this.constructor.#x; }
}

const point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
