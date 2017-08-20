var Point = function () {
  function Point(x = 0, y = 0) {
    babelHelpers.classCallCheck(this, Point);

    _initialiseProps.call(this);

    this.constructor._private_class_x = +x;
    this._private_class_y = +y;
  }

  babelHelpers.createClass(Point, [{
    key: "equals",
    value: function equals(p) {
      return this.constructor._private_class_x === p._private_class_x && this._private_class_y === p._private_class_y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return `Point<${this.constructor._private_class_x},${this._private_class_y}>`;
    }
  }, {
    key: "test",
    value: function test() {
      return this.constructor._private_class_x;
    }
  }, {
    key: "x",
    get: function () {
      return this.constructor._private_class_x;
    },
    set: function (value) {
      this.constructor._private_class_x = +value;
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
  this.constructor._private_class_x = 1;
  this._private_class_y = 2;
};

var point = new Point(20, 6);
assert.strictEqual(point.test(), 20);
