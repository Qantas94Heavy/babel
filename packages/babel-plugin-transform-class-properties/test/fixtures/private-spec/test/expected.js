var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsSetSpec(_private, this.constructor, "x", +x);
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +y);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
    }
  }, {
    key: "test",
    value: function test() {
      return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x");
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsGetSpec(_private, this.constructor, "x");
    },
    set: function (value) {
      babelHelpers.privateFieldsSetSpec(_private, this.constructor, "x", +value);
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateFieldsGetSpec(_private, this, "y");
    },
    set: function (value) {
      babelHelpers.privateFieldsSetSpec(_private, this, "y", +value);
    }
  }]);
  return Point;
}();

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();

var _initialiseProps = function () {
  _private.x.set(this.constructor, 1);

  _private.y.set(this, 2);
};

var point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
