const containerEl = document.getElementById("container");
const boxEl = document.createElement("div");
const btnEl = document.getElementById("btn-animation");
const btnStopEl = document.getElementById("btn-stop");
const redCircleEl = document.createElement("div");
const blueCircleEl = document.createElement("div");

boxEl.classList.add("box");

redCircleEl.id = "red-circle";
blueCircleEl.id = "blue-circle";

redCircleEl.classList.add("red-circle");
blueCircleEl.classList.add("blue-circle");

containerEl.appendChild(boxEl);
boxEl.appendChild(redCircleEl);
boxEl.appendChild(blueCircleEl);

let initialRedX = Math.floor(Math.random() * 450);
let initialRedY = Math.floor(Math.random() * 450);
let initialBlueX = Math.floor(Math.random() * 450);
let initialBlueY = Math.floor(Math.random() * 450);

let redIntervalId;
let blueIntervalId;

let directionRedX = 1;
let directionRedY = 1;

let directionBlueX = 1;
let directionBlueY = 1;

function collisionDetection() {
  if (
    initialRedX < initialBlueX + 50 &&
    initialRedX + 50 > initialBlueX &&
    initialRedY < initialBlueY + 50 &&
    initialRedY + 50 > initialBlueY
  ) {
    console.log("COLLIDE");

    directionRedX *= -1;
    directionRedY *= -1;
    directionBlueX *= -1;
    directionBlueY *= -1;
  }
}
function startAnimation() {
  if (redIntervalId || blueIntervalId) {
    clearInterval(redIntervalId);
    clearInterval(blueIntervalId);
  }

  redIntervalId = setInterval(() => {
    console.log(initialRedX, initialRedY);
    initialRedX += directionRedX;
    initialRedY += directionRedY;

    if (initialRedX >= 450 || initialRedX <= 0) {
      directionRedX *= -1;
    }
    if (initialRedY >= 450 || initialRedY <= 0) {
      directionRedY *= -1;
    }

    redCircleEl.style.left = initialRedX + "px";
    redCircleEl.style.top = initialRedY + "px";
    collisionDetection();
  }, 5);
  blueIntervalId = setInterval(() => {
    console.log(initialBlueX, initialBlueY);
    initialBlueX += directionBlueX;
    initialBlueY += directionBlueY;

    if (initialBlueX >= 450 || initialBlueX <= 0) {
      directionBlueX *= -1;
    }
    if (initialBlueY >= 450 || initialBlueY <= 0) {
      directionBlueY *= -1;
    }

    blueCircleEl.style.left = initialBlueX + "px";
    blueCircleEl.style.top = initialBlueY + "px";
    collisionDetection();
  }, 5);
}

function stopAnimation() {
  clearInterval(redIntervalId);
  clearInterval(blueIntervalId);
}

startAnimation();

btnStopEl.addEventListener("click", stopAnimation);
