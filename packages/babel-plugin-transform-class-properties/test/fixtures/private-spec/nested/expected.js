var Point = function () {
  function Point(x = 0, y = 0) {
    var _class, _temp, _private2, _initialiseProps2;

    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsSetSpec(_private, this, "x", +x);
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +y);
    this.foo = (_temp = _class = function () {
      function _class(x = 0, y = 0) {
        babelHelpers.classCallCheck(this, _class);

        _initialiseProps2.call(this);

        babelHelpers.privateFieldsSetSpec(_private2, this, "x", +x);
        babelHelpers.privateFieldsSetSpec(_private2, this, "y", +y);
      }

      babelHelpers.createClass(_class, [{
        key: "equals",
        value: function equals(p) {
          return babelHelpers.privateFieldsGetSpec(_private2, this, "x") === babelHelpers.privateFieldsGetSpec(_private2, p, "x") && babelHelpers.privateFieldsGetSpec(_private2, this, "y") === babelHelpers.privateFieldsGetSpec(_private2, p, "y");
        }
      }, {
        key: "toString",
        value: function toString() {
          return `Point<${babelHelpers.privateFieldsGetSpec(_private2, this, "x")},${babelHelpers.privateFieldsGetSpec(_private2, this, "y")}>`;
        }
      }, {
        key: "x",
        get: function () {
          return babelHelpers.privateFieldsGetSpec(_private2, this, "x");
        },
        set: function (value) {
          babelHelpers.privateFieldsSetSpec(_private2, this, "x", +value);
        }
      }, {
        key: "y",
        get: function () {
          return babelHelpers.privateFieldsGetSpec(_private2, this, "y");
        },
        set: function (value) {
          babelHelpers.privateFieldsSetSpec(_private2, this, "y", +value);
        }
      }]);
      return _class;
    }(), _private2 = Object.create(null), _private2.x = new WeakMap(), _private2.y = new WeakMap(), _initialiseProps2 = function () {
      _private2.x.set(this, 1);

      _private2.y.set(this, 2);
    }, _temp);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsGetSpec(_private, this, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsGetSpec(_private, this, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsGetSpec(_private, this, "x");
    },
    set: function (value) {
      babelHelpers.privateFieldsSetSpec(_private, this, "x", +value);
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
  _private.x.set(this, 1);

  _private.y.set(this, 2);
};
