/*
EX6 : Scatter plotting data in an object (JSON)

var data = [
	{ top: 2, left: 5 },
	{ top: 10, left: 6 },
	….. // add numerous similar data
];

> Parent container must be at “relative” position of 500x500 dimension
> Each object inside data must be plotted as “absolute” position
*/

let data = [
  { top: 45, left: 120 },
  { top: 200, left: 350 },
  { top: 90, left: 410 },
  { top: 310, left: 250 },
  { top: 150, left: 30 },

  { top: 220, left: 180 },
  { top: 130, left: 90 },
  { top: 50, left: 300 },
];

const parentEl = document.getElementById("main-parent");

parentEl.style.height = "500px";
parentEl.style.width = "500px";
parentEl.style.backgroundColor = "red";
parentEl.style.position = "relative";

data.map((item) => {
  console.log(item);
  const childEl = document.createElement("div");
  childEl.style.position = "absolute";
  childEl.style.backgroundColor = "yellow";
  childEl.style.height = "20px";
  childEl.style.width = "20px";
  childEl.style.top = item.top + "px";
  childEl.style.left = item.left + "px";
  parentEl.appendChild(childEl);
});
