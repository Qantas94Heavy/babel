const Person = function () {
  let ids = 0;
  return class Person {

    constructor(name, makeGreeting) {
      this._private_class_id = undefined;
      this._private_class_makeGreeting = undefined;

      this.name = name;
      babelHelpers.privateFieldsCheckNonSpec(this, "", "id")._private_class_id = ids++;
      babelHelpers.privateFieldsCheckNonSpec(this, "", "makeGreeting")._private_class_makeGreeting = makeGreeting;
    }
    equals(otherPerson) {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "id")._private_class_id === babelHelpers.privateFieldsCheckNonSpec(otherPerson, "", "id")._private_class_id;
    }
    greet(otherPerson) {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "makeGreeting")._private_class_makeGreeting(otherPerson.name);
    }
  };
}();

let alice = new Person('Alice', name => `Hello, ${name}!`);
let bob = new Person('Bob', name => `Hi, ${name}.`);
assert.strictEqual(alice.equals(bob), false);
assert.strictEqual(alice.greet(bob), 'Hello, Bob!');

let mallory = new Person('Mallory', function (name) {
  this.id = 0;return `o/ ${name}`;
});
assert.strictEqual(mallory.greet(bob), 'o/ Bob');
// Make sure this is not true (will be true in a naive implementation).
assert.strictEqual(mallory.equals(alice), false);