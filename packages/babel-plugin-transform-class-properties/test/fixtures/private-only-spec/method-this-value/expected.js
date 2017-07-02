const Person = function () {
  var _class, _temp, _private_class_wm, _initialiseProps;

  let ids = 0;
  return _temp = _class = class Person {
    constructor(name, makeGreeting) {
      _initialiseProps.call(this);

      this.name = name;
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "id").id = ids++;
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "makeGreeting").makeGreeting = makeGreeting;
    }

    equals(otherPerson) {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "id").id === babelHelpers.privateFieldsCheckSpec(_private_class_wm, otherPerson, "id").id;
    }

    greet(otherPerson) {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "makeGreeting").makeGreeting.apply(this, [otherPerson.name]);
    }

  }, _private_class_wm = new WeakMap(), _initialiseProps = function () {
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.id = undefined;
    _private_field_obj.makeGreeting = undefined;
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