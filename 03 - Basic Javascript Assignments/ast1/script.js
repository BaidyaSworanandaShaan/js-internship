let i = 1;

const startAnimation = setInterval(print, 400);
let sequential = true;
function print() {
  if (sequential) {
    let str = "";
    for (j = 1; j <= i; j++) {
      str += "*";
    }
    console.log(str);
    i++;

    if (i >= 5) {
      sequential = false;
    }
  } else {
    let str = "";
    for (j = i; j >= 1; j--) {
      str += "*";
    }
    console.log(str);
    i--;
    if (i <= 0) {
      i = 2;
      sequential = true;
    }
  }
}
