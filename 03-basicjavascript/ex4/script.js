let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

function looper(arr, tranFunc) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    arr[i] = tranFunc(element);
  }
  return arr;
}
let output = looper(numbers, function (num) {
  return num * 2;
});
console.log(output);
