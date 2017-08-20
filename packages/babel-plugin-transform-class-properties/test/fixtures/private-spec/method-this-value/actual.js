const Person = (function () {
  let ids = 0;
  return class Person {
    #id;
    #makeGreeting;
    
    constructor(name, makeGreeting) {
      this.name = name;
      this.#id = ids++;
      this.#makeGreeting = makeGreeting;
    }
    equals(otherPerson) {
      return this.#id === otherPerson.#id;
    }
    greet(otherPerson) {
      return this.#makeGreeting(otherPerson.name);
    }
  };
})();

let alice = new Person('Alice', name => `Hello, ${name}!`);
let bob = new Person('Bob', name => `Hi, ${name}.`);
assert.strictEqual(alice.equals(bob), false);
assert.strictEqual(alice.greet(bob), 'Hello, Bob!');

let mallory = new Person('Mallory', function(name) {this.id = 0; return `o/ ${name}`;});
assert.strictEqual(mallory.greet(bob), 'o/ Bob');
// Make sure this is not true (will be true in a naive implementation).
assert.strictEqual(mallory.equals(alice), false);
