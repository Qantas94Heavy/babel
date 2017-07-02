var _private_class_wm = new WeakMap();

var Point = function () {
  function Point(x = 0, y = 0) {
    var _private_class_wm2;

    babelHelpers.classCallCheck(this, Point);

    _private_class_wm.set(this, {
      x: 1,
      y: 2
    });

    _private_class_wm.get(this).x = +x;
    _private_class_wm.get(this).y = +y;

    this.foo = (_private_class_wm2 = new WeakMap(), function () {
      function _class(x = 0, y = 0) {
        babelHelpers.classCallCheck(this, _class);

        _private_class_wm2.set(this, {
          x: 1,
          y: 2
        });

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
    }());
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