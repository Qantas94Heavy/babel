var Person = function () {
  var _class, _temp, _private_class_wm, _initialiseProps;

  var ids = 0;
  return _temp = _class = function () {
    function Person(name, makeGreeting) {
      babelHelpers.classCallCheck(this, Person);

      _initialiseProps.call(this);

      this.name = name;
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "id").id = ids++;
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "makeGreeting").makeGreeting = makeGreeting;
    }

    babelHelpers.createClass(Person, [{
      key: "equals",
      value: function equals(otherPerson) {
        return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "id").id === babelHelpers.privateFieldsCheckSpec(_private_class_wm, otherPerson, "id").id;
      }
    }, {
      key: "greet",
      value: function greet(otherPerson) {
        return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "makeGreeting").makeGreeting.apply(this, [otherPerson.name]);
      }
    }]);
    return Person;
  }(), _private_class_wm = new WeakMap(), _initialiseProps = function () {
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.id = void 0;
    _private_field_obj.makeGreeting = void 0;
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
