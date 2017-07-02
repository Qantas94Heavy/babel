var _private_class_wm = new WeakMap();

class A {
  constructor() {
    _private_class_wm.set(this, {
      x: undefined,
      y: undefined
    });
  }

}

var _private_class_wm2 = new WeakMap();

class B {
  constructor() {
    _private_class_wm2.set(this, {
      x: 0,
      y: 1
    });
  }

}