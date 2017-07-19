var Person = function () {
  var _class, _temp, _initialiseProps;

  var ids = 0;
  return _temp = _class = function () {
    function Person(name, makeGreeting) {
      babelHelpers.classCallCheck(this, Person);

      _initialiseProps.call(this);

      this.name = name;
      this._private_class_id = ids++;
      this._private_class_makeGreeting = makeGreeting;
    }

    babelHelpers.createClass(Person, [{
      key: "equals",
      value: function equals(otherPerson) {
        return this._private_class_id === otherPerson._private_class_id;
      }
    }, {
      key: "greet",
      value: function greet(otherPerson) {
        return this._private_class_makeGreeting(otherPerson.name);
      }
    }]);
    return Person;
  }(), _initialiseProps = function () {
    this._private_class_id = undefined;
    this._private_class_makeGreeting = undefined;
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