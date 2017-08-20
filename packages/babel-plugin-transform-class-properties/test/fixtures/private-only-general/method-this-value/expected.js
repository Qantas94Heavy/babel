const Person = function () {
  var _class, _temp, _initialiseProps;

  let ids = 0;
  return _temp = _class = class Person {
    constructor(name, makeGreeting) {
      _initialiseProps.call(this);

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

  }, _initialiseProps = function () {
    this._private_class_id = void 0;
    this._private_class_makeGreeting = void 0;
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
