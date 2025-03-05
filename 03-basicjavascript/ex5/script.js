// EX5 : Program to toggle background of a div

// - Colors should be defined in an array
// var colors = [“red”,” “blue”, “green”, “yellow”]

// - On clicking the div the color should be toggled to next one.
// - After reaching the last color, the color should be toggled to the first one

const colors = ["red", "blue", "green", "yellow"];

const container = document.getElementById("main-container");
let indexOfColor = 0;
function backgroundColorChange(e) {
  console.log(indexOfColor);
  container.style.background = colors[indexOfColor];

  indexOfColor === colors.length - 1 ? (indexOfColor = 0) : indexOfColor++;
}

container.addEventListener("click", backgroundColorChange);
