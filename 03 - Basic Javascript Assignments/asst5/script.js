const containerEl = document.getElementById("container");
const boxEl = document.createElement("div");
const btnEl = document.getElementById("btn-animation");
const btnStopEl = document.getElementById("btn-stop");
const circleEl = document.createElement("div");

boxEl.classList.add("box");
circleEl.id = "circle";
circleEl.classList.add("circle");
containerEl.appendChild(boxEl);
boxEl.appendChild(circleEl);

btnEl.addEventListener("click", startAnimation);
btnStopEl.addEventListener("click", stopAnimation);
let initialX = Math.floor(Math.random() * 450);
let initialY = Math.floor(Math.random() * 450);
let intervalId;
let directionX = 1;
let directionY = 1;
function startAnimation() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    console.log(initialX, initialY);
    initialX += directionX;
    initialY += directionY;

    if (initialX >= 450 || initialX <= 0) {
      directionX *= -1;
    }
    if (initialY >= 450 || initialY <= 0) {
      directionY *= -1;
    }

    circleEl.style.top = initialX + "px";
    circleEl.style.left = initialY + "px";
  }, 1);
}

function stopAnimation() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}
