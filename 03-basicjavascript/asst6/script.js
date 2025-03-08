const smashEffect = new Audio("music/smash.mp3");

let gameState = [
  { x: 50, y: 50, dx: 2, dy: 2 },
  { x: 200, y: 248, dx: -2, dy: 2 },
  { x: 232, y: 123, dx: 2, dy: -2 },
  { x: 432, y: 412, dx: -2, dy: -2 },
  { x: 324, y: 252, dx: 2, dy: 2 },
  { x: 212, y: 12, dx: -2, dy: 2 },
  { x: 78, y: 350, dx: 2, dy: -2 },
  { x: 145, y: 278, dx: -2, dy: 2 },
  { x: 412, y: 34, dx: 2, dy: -2 },
  { x: 378, y: 189, dx: -2, dy: -2 },
  { x: 299, y: 400, dx: 2, dy: 2 },
  { x: 170, y: 85, dx: -2, dy: 2 },
];

const containerEl = document.getElementById("container");
const boxEl = document.createElement("div");
boxEl.classList.add("box");

containerEl.appendChild(boxEl);

const gameLoopId = setInterval(gameLoop, 25);

function collisionDetection() {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = i + 1; j < gameState.length; j++) {
      let obj1 = gameState[i];
      let obj2 = gameState[j];

      if (
        obj1.x < obj2.x + 51 &&
        obj1.x + 51 > obj2.x &&
        obj1.y < obj2.y + 51 &&
        obj1.y + 51 > obj2.y
      ) {
        obj1.dx *= -1;
        obj1.dy *= -1;
        obj2.dx *= -1;
        obj2.dy *= -1;
      }
    }
  }
}

gameState.forEach((element, index) => {
  const circleEl = document.createElement("div");
  const img = document.createElement("img");
  img.src = "img/ant.png";
  img.width = 50;
  img.height = 50;
  circleEl.classList.add("circle");
  circleEl.id = `circle-${index}`;

  circleEl.style.top = element.x + "px";
  circleEl.style.left = element.y + "px";

  circleEl.appendChild(img);
  boxEl.appendChild(circleEl);
});

const circleWrapper = boxEl.childNodes;

circleWrapper.forEach((element) => {
  console.log(element);
  element.addEventListener("mouseover", () => {
    element.style.cursor = "pointer";
  });
  element.addEventListener("click", () => {
    const deadAnt = element.querySelector("img");
    deadAnt.src = "img/blood.png";
    smashEffect.play();
    setTimeout(() => {
      element.remove();
    }, 300);
  });
});

function gameLoop() {
  console.log(gameState);
  gameState.forEach((item, index) => {
    item.x += item.dx;
    item.y += item.dy;
    if (item.x >= 450 || item.x <= 0) {
      item.dx *= -1;
    }
    if (item.y >= 450 || item.y <= 0) {
      item.dy *= -1;
    }
  });

  collisionDetection();

  render(gameState);
}

function render(gameState) {
  gameState.forEach((element, index) => {
    const circleEl = document.getElementById(`circle-${index}`);
    if (circleEl) {
      circleEl.style.top = element.y + "px";
      circleEl.style.left = element.x + "px";
    }
  });
}
