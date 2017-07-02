var Point = function () {
  function Point(x = 0, y = 0) {
    var _class, _temp, _private_class_wm2, _initialiseProps2;

    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +x;
    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +y;
    this.foo = (_temp = _class = function () {
      function _class(x = 0, y = 0) {
        babelHelpers.classCallCheck(this, _class);

        _initialiseProps2.call(this);

        babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +x;
        babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +y;
      }

      babelHelpers.createClass(_class, [{
        key: "equals",
        value: function equals(p) {
          return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "x").x && babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "y").y;
        }
      }, {
        key: "toString",
        value: function toString() {
          return `Point<${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x},${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y}>`;
        }
      }, {
        key: "x",
        get: function () {
          return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x;
        },
        set: function (value) {
          babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +value;
        }
      }, {
        key: "y",
        get: function () {
          return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y;
        },
        set: function (value) {
          babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +value;
        }
      }]);
      return _class;
    }(), _private_class_wm2 = new WeakMap(), _initialiseProps2 = function () {
      var _private_field_obj2 = {};

      _private_class_wm2.set(this, _private_field_obj2);

      _private_field_obj2.x = 1;
      _private_field_obj2.y = 2;
    }, _temp);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "x").x && babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "y").y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x},${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y;
    },
    set: function (value) {
      babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +value;
    }
  }]);
  return Point;
}();

var _private_class_wm = new WeakMap();

var _initialiseProps = function () {
  var _private_field_obj = {};

  _private_class_wm.set(this, _private_field_obj);

  _private_field_obj.x = 1;
  _private_field_obj.y = 2;
};