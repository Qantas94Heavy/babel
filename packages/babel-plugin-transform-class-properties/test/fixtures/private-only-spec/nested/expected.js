class Point {
  constructor(x = 0, y = 0) {
    var _class, _temp, _private2, _initialiseProps2;

    _initialiseProps.call(this);

    babelHelpers.privateFieldsSetSpec(_private, this, "x", +x);
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +y);
    this.foo = (_temp = _class = class {
      constructor(x = 0, y = 0) {
        _initialiseProps2.call(this);

        babelHelpers.privateFieldsSetSpec(_private2, this, "x", +x);
        babelHelpers.privateFieldsSetSpec(_private2, this, "y", +y);
      }

      get x() {
        return babelHelpers.privateFieldsGetSpec(_private2, this, "x");
      }

      set x(value) {
        babelHelpers.privateFieldsSetSpec(_private2, this, "x", +value);
      }

      get y() {
        return babelHelpers.privateFieldsGetSpec(_private2, this, "y");
      }

      set y(value) {
        babelHelpers.privateFieldsSetSpec(_private2, this, "y", +value);
      }

      equals(p) {
        return babelHelpers.privateFieldsGetSpec(_private2, this, "x") === babelHelpers.privateFieldsGetSpec(_private2, p, "x") && babelHelpers.privateFieldsGetSpec(_private2, this, "y") === babelHelpers.privateFieldsGetSpec(_private2, p, "y");
      }

      toString() {
        return `Point<${babelHelpers.privateFieldsGetSpec(_private2, this, "x")},${babelHelpers.privateFieldsGetSpec(_private2, this, "y")}>`;
      }

    }, _private2 = Object.create(null), _private2.x = new WeakMap(), _private2.y = new WeakMap(), _initialiseProps2 = function () {
      _private2.x.set(this, 1);

      _private2.y.set(this, 2);
    }, _temp);
  }

  get x() {
    return babelHelpers.privateFieldsGetSpec(_private, this, "x");
  }

  set x(value) {
    babelHelpers.privateFieldsSetSpec(_private, this, "x", +value);
  }

  get y() {
    return babelHelpers.privateFieldsGetSpec(_private, this, "y");
  }

  set y(value) {
    babelHelpers.privateFieldsSetSpec(_private, this, "y", +value);
  }

  equals(p) {
    return babelHelpers.privateFieldsGetSpec(_private, this, "x") === babelHelpers.privateFieldsGetSpec(_private, p, "x") && babelHelpers.privateFieldsGetSpec(_private, this, "y") === babelHelpers.privateFieldsGetSpec(_private, p, "y");
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsGetSpec(_private, this, "x")},${babelHelpers.privateFieldsGetSpec(_private, this, "y")}>`;
  }

}

var _private = Object.create(null);

_private.x = new WeakMap();
_private.y = new WeakMap();

var _initialiseProps = function () {
  _private.x.set(this, 1);

  _private.y.set(this, 2);
};
