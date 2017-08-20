export default (param => function () {
  function App() {
    babelHelpers.classCallCheck(this, App);
    this._private_class_x = void 0;
  }

  babelHelpers.createClass(App, [{
    key: "getParam",
    value: function getParam() {
      return babelHelpers.privateFieldsCheckNonSpec(this, "", "x")._private_class_x;
    }
  }]);
  return App;
}());
