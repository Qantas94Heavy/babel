function x() {
  let a = 1;
  let b = 2;

  // broken
  if(true) [a, b] = [b, a];

  // ok
  if(true) {
    [a, b] = [b, a];
  }
}
