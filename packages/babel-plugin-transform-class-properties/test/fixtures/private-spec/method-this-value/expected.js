var Person = function () {
  var _class, _temp, _private, _initialiseProps;

  var ids = 0;
  return _temp = _class = function () {
    function Person(name, makeGreeting) {
      babelHelpers.classCallCheck(this, Person);

      _initialiseProps.call(this);

      this.name = name;
      babelHelpers.privateFieldsSetSpec(_private, this, "id", ids++);
      babelHelpers.privateFieldsSetSpec(_private, this, "makeGreeting", makeGreeting);
    }

    babelHelpers.createClass(Person, [{
      key: "equals",
      value: function equals(otherPerson) {
        return babelHelpers.privateFieldsGetSpec(_private, this, "id") === babelHelpers.privateFieldsGetSpec(_private, otherPerson, "id");
      }
    }, {
      key: "greet",
      value: function greet(otherPerson) {
        return babelHelpers.privateFieldsCallSpec(_private, this, "makeGreeting", [otherPerson.name]);
      }
    }]);
    return Person;
  }(), _private = Object.create(null), _private.id = new WeakMap(), _private.makeGreeting = new WeakMap(), _initialiseProps = function () {
    _private.id.set(this, void 0);

    _private.makeGreeting.set(this, void 0);
  }, _temp;
}();

var alice = new Person('Alice', name => `Hello, ${name}!`);
var bob = new Person('Bob', name => `Hi, ${name}.`);
assert.strictEqual(alice.equals(bob), false);
assert.strictEqual(alice.greet(bob), 'Hello, Bob!');
var mallory = new Person('Mallory', function (name) {
  this.id = 0;
  return `o/ ${name}`;
});
assert.strictEqual(mallory.greet(bob), 'o/ Bob'); // Make sure this is not true (will be true in a naive implementation).

assert.strictEqual(mallory.equals(alice), false);
