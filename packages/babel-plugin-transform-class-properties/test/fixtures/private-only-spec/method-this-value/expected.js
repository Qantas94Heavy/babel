const Person = function () {
  var _class, _temp, _private, _initialiseProps;

  let ids = 0;
  return _temp = _class = class Person {
    constructor(name, makeGreeting) {
      _initialiseProps.call(this);

      this.name = name;
      babelHelpers.privateFieldsSetSpec(_private, this, "id", ids++);
      babelHelpers.privateFieldsSetSpec(_private, this, "makeGreeting", makeGreeting);
    }

    equals(otherPerson) {
      return babelHelpers.privateFieldsGetSpec(_private, this, "id") === babelHelpers.privateFieldsGetSpec(_private, otherPerson, "id");
    }

    greet(otherPerson) {
      return babelHelpers.privateFieldsCallSpec(_private, this, "makeGreeting", [otherPerson.name]);
    }

  }, _private = Object.create(null), _private.id = new WeakMap(), _private.makeGreeting = new WeakMap(), _initialiseProps = function () {
    _private.id.set(this, void 0);

    _private.makeGreeting.set(this, void 0);
  }, _temp;
}();

let alice = new Person('Alice', name => `Hello, ${name}!`);
let bob = new Person('Bob', name => `Hi, ${name}.`);
assert.strictEqual(alice.equals(bob), false);
assert.strictEqual(alice.greet(bob), 'Hello, Bob!');
let mallory = new Person('Mallory', function (name) {
  this.id = 0;
  return `o/ ${name}`;
});
assert.strictEqual(mallory.greet(bob), 'o/ Bob'); // Make sure this is not true (will be true in a naive implementation).

assert.strictEqual(mallory.equals(alice), false);
