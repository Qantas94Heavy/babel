class Foo {}

class Point extends Foo {
  constructor(...args) {
    var _temp, _private_field_obj;

    return _temp = super(...args), _private_field_obj = {}, _private_class_wm.set(this, _private_field_obj), _private_field_obj.x = 0, _private_field_obj.y = 0, _temp;
  }

  get x() {
    return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x;
  }

  set x(value) {
    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x = +value;
  }

  get y() {
    return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y;
  }

  set y(value) {
    babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y = +value;
  }

  equals(p) {
    return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "x").x && babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y === babelHelpers.privateFieldsCheckSpec(_private_class_wm, p, "y").y;
  }

  toString() {
    return `Point<${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x},${babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "y").y}>`;
  }

}

var _private_class_wm = new WeakMap();
