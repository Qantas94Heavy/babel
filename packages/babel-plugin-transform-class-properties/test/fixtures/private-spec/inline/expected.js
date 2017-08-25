var A = function A() {
  babelHelpers.classCallCheck(this, A);

  _private.x.set(this, void 0);

  _private.y.set(this, void 0);
};

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();

var B = function B() {
  babelHelpers.classCallCheck(this, B);

  _private2.x.set(this, 0);

  _private2.y.set(this, 1);
};

var _private2 = Object.create(null);

_private2.x = new WeakMap();
_private2.y = new WeakMap();
