/*AST2 : Convert scatter plot into ant smasher game

2.1) Function to return random value between two numbers
Eg:  randomFunction(1, 5) // should return single random value from 1,2,3,4,5
Note: Google : Javascript inbuilt Math.random() method
2.2) Use random function from Assignment 1 to generate random plots in the previous scatter plotting example

2.3) On clicking any point, it should be removed from the view
2.4) After removing a plot its coordinates must be added to a list below the scatter  plot (Use “ul” and “li” elements)
*/

const parentEl = document.getElementById("main-parent");
const coordinatesEl = document.getElementById("cordinates-output");

function randomFunction(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

console.log(randomFunction(0, 5));

parentEl.style.height = "500px";
parentEl.style.width = "500px";
parentEl.style.backgroundColor = "red";
parentEl.style.position = "relative";

let data = [];
let counter = 10;
while (counter > 0) {
  data.push({ top: randomFunction(0, 399), left: randomFunction(0, 399) });
  counter--;
}

console.log(data);

data.map((item, index) => {
  console.log(item);
  const childEl = document.createElement("div");
  childEl.id = `child-${index}`;
  childEl.style.position = "absolute";
  childEl.style.backgroundColor = "yellow";
  childEl.style.height = "20px";
  childEl.style.width = "20px";
  childEl.style.top = item.top + "px";
  childEl.style.left = item.left + "px";
  parentEl.appendChild(childEl);
});
const list = document.createElement("ul");
parentEl.addEventListener("click", function (e) {
  if (e.target.id.includes("child-")) {
    const item = document.createElement("li");

    const str = `Top : ${e.target.style.top} Left : ${e.target.style.left}`;
    item.textContent = str;
    list.appendChild(item);
    coordinatesEl.appendChild(list);
    parentEl.removeChild(e.target);
  }
});
