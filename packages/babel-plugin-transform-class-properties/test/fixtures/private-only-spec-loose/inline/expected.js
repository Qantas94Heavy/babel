class A {
  constructor() {
    var _private_field_obj = {};

    _private_class_wm.set(this, _private_field_obj);

    _private_field_obj.x = void 0;
    _private_field_obj.y = void 0;
  }

}

var _private_class_wm = new WeakMap();

class B {
  constructor() {
    var _private_field_obj2 = {};

    _private_class_wm2.set(this, _private_field_obj2);

    _private_field_obj2.x = 0;
    _private_field_obj2.y = 1;
  }

}

var _private_class_wm2 = new WeakMap();
