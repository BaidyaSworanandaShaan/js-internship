function printPattern(n) {
  let pattern = "";
  for (let i = n; i >= 1; i--) {
    for (let j = i; j >= 1; j--) {
      pattern += "*";
    }
    pattern += "\n";
  }
  console.log(pattern);
}

printPattern(5);
