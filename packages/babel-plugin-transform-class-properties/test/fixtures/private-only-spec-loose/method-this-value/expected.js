const Person = function () {
  var _class, _temp, _private_class_wm, _initialiseProps;

  let ids = 0;
  return _temp = _class = class Person {
    constructor(name, makeGreeting) {
      _initialiseProps.call(this);

      this.name = name;
      _private_class_wm.get(this).id = ids++;
      _private_class_wm.get(this).makeGreeting = makeGreeting;
    }

    equals(otherPerson) {
      return _private_class_wm.get(this).id === _private_class_wm.get(otherPerson).id;
    }

    greet(otherPerson) {
      return _private_class_wm.get(this).makeGreeting.apply(this, [otherPerson.name]);
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