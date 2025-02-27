// function animate(n, callback) {
//   let rowcount = 1;
//   let pattern = "";
//   while (rowcount <= n) {
//     let colcount = 1;
//     while (colcount <= rowcount) {
//       pattern += "*";
//       callback(pattern);
//       colcount++;
//     }
//     pattern += "\n";
//     callback(pattern);
//     rowcount++;
//   }
// }

// function counter() {
//   let str = "";
//   for (let i = 1; i <= 5; i++) {
//     setTimeout(function () {
//       setTimeout(function () {
//         for (let j = 1; j <= i; j++) {
//           str += "*";
//           console.log(str);
//         }
//       }, i * 1000);

//       str += "\n";
//       console.log(str);
//     }, i * 1000);
//   }
// }

// function animate() {
//   counter();
// }
// animate();
