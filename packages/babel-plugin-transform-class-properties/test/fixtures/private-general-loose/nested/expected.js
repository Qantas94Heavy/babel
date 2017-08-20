var Point = function () {
  function Point(x = 0, y = 0) {
    var _class, _temp, _initialiseProps2;

    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    this._private_class_x = +x;
    this._private_class_y = +y;
    this.foo = (_temp = _class = function () {
      function _class(x = 0, y = 0) {
        babelHelpers.classCallCheck(this, _class);

        _initialiseProps2.call(this);

        this._private_class_x = +x;
        this._private_class_y = +y;
      }

      babelHelpers.createClass(_class, [{
        key: "equals",
        value: function equals(p) {
          return this._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
        }
      }, {
        key: "toString",
        value: function toString() {
          return `Point<${this._private_class_x},${this._private_class_y}>`;
        }
      }, {
        key: "x",
        get: function () {
          return this._private_class_x;
        },
        set: function (value) {
          this._private_class_x = +value;
        }
      }, {
        key: "y",
        get: function () {
          return this._private_class_y;
        },
        set: function (value) {
          this._private_class_y = +value;
        }
      }]);
      return _class;
    }(), _initialiseProps2 = function () {
      this._private_class2_x = 1;
      this._private_class2_y = 2;
    }, _temp);
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return this._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${this._private_class_x},${this._private_class_y}>`;
    }
  }, {
    key: "x",
    get: function () {
      return this._private_class_x;
    },
    set: function (value) {
      this._private_class_x = +value;
    }
  }, {
    key: "y",
    get: function () {
      return this._private_class_y;
    },
    set: function (value) {
      this._private_class_y = +value;
    }
  }]);
  return Point;
}();

var _initialiseProps = function () {
  this._private_class_x = 1;
  this._private_class_y = 2;
};
