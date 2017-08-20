var Point = function () {
  function Point(x = 0, y = 0) {
    var _class, _temp, _private_class_wm2, _initialiseProps2;

    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    _private_class_wm.get(this).x = +x;
    _private_class_wm.get(this).y = +y;
    this.foo = (_temp = _class = function () {
      function _class(x = 0, y = 0) {
        babelHelpers.classCallCheck(this, _class);

        _initialiseProps2.call(this);

        _private_class_wm.get(this).x = +x;
        _private_class_wm.get(this).y = +y;
      }

      babelHelpers.createClass(_class, [{
        key: "equals",
        value: function equals(p) {
          return _private_class_wm.get(this).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
        }
      }, {
        key: "toString",
        value: function toString() {
          return `Point<${_private_class_wm.get(this).x},${_private_class_wm.get(this).y}>`;
        }
      }, {
        key: "x",
        get: function () {
          return _private_class_wm.get(this).x;
        },
        set: function (value) {
          _private_class_wm.get(this).x = +value;
        }
      }, {
        key: "y",
        get: function () {
          return _private_class_wm.get(this).y;
        },
        set: function (value) {
          _private_class_wm.get(this).y = +value;
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
      return _private_class_wm.get(this).x === _private_class_wm.get(p).x && _private_class_wm.get(this).y === _private_class_wm.get(p).y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${_private_class_wm.get(this).x},${_private_class_wm.get(this).y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return _private_class_wm.get(this).x;
    },
    set: function (value) {
      _private_class_wm.get(this).x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return _private_class_wm.get(this).y;
    },
    set: function (value) {
      _private_class_wm.get(this).y = +value;
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
