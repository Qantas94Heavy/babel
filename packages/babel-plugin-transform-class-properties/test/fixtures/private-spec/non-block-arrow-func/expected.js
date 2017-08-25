export default (param => {
  var _class, _temp, _private;

  return class App {
    constructor() {
      _private.x.set(this, void 0);
    }

    getParam() {
      return babelHelpers.privateFieldsGetSpec(_private, this, "x");
    }

  };
});
