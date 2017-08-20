var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    this._private_class_x = +x;
    this._private_class_y = +y;
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
  this._private_class_x = void 0;
  this._private_class_y = void 0;
};
