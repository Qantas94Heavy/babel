export default (param => class App {
  constructor() {
    this._private_class_x = void 0;
  }

  getParam() {
    return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x;
  }

});
