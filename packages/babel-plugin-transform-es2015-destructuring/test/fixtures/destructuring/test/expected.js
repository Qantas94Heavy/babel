function x() {
  var a = 1;
  var b = 2;

  // broken
  if (true) {
    ;

    var _ref = [b, a];
    a = _ref[0];
    b = _ref[1];
  } // ok
  if (true) {
    var _ref2 = [b, a];
    a = _ref2[0];
    b = _ref2[1];
  }
}