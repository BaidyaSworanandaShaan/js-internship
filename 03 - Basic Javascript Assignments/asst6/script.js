const containerEl = document.getElementById("container");
const boxEl = document.createElement("div");
const btnEl = document.getElementById("btn-animation");
const btnStopEl = document.getElementById("btn-stop");

function randomFunction(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let numberOfCircle = 10;

let directionRedX = 1;
let directionRedY = 1;
boxEl.classList.add("box");
containerEl.appendChild(boxEl);
while (numberOfCircle > 0) {
  const circleEl = document.createElement("div");
  circleEl.id = `circle-${numberOfCircle}`;
  circleEl.classList.add("circle");
  boxEl.appendChild(circleEl);
  numberOfCircle--;
}

containerEl.appendChild(boxEl);

const totalNumberofCircle = boxEl.childNodes.length;

function startAnimation() {
  const circlePosArray = [];
  for (let index = 0; index < totalNumberofCircle; index++) {
    const item = boxEl.childNodes[index];
    const initialCircleTop = window.getComputedStyle(item).top;
    const initialCircleLeft = window.getComputedStyle(item).left;

    circlePosArray.push([
      parseInt(initialCircleTop),
      parseInt(initialCircleLeft),
    ]);
  }

  circlePosArray.forEach((coordinates, index) => {
    let [initialRedX, initialRedY] = coordinates;

    setInterval(() => {
      initialRedX = (initialRedX + Math.floor(Math.random() * 450)) % 450;
      initialRedY = (initialRedY + Math.floor(Math.random() * 450)) % 450;
      initialRedX += directionRedX;
      initialRedY += directionRedY;

      if (initialRedX >= 450 || initialRedX <= 0) {
        directionRedX *= -1;
      }
      if (initialRedY >= 450 || initialRedY <= 0) {
        directionRedY *= -1;
      }
      const item = boxEl.childNodes[index];

      item.style.top = initialRedX + "px";
      item.style.left = initialRedY + "px";
    }, 10);
  });

  //   Animation
}
startAnimation();
