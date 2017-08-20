export default (param => {
  var _class, _temp, _private_class_wm;

  return class App {
    constructor() {
      var _private_field_obj = {};

      _private_class_wm.set(this, _private_field_obj);

      _private_field_obj.x = void 0;
    }

    getParam() {
      return babelHelpers.privateFieldsCheckSpec(_private_class_wm, this, "x").x;
    }

  };
});
