// const containerEl = document.getElementById("container");
// const boxEl = document.createElement("div");
// const btnEl = document.getElementById("btn-animation");
// const btnStopEl = document.getElementById("btn-stop");

// function randomFunction(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

// function collisionDetection(circlePosArray) {}
// let numberOfCircle = 10;

// boxEl.classList.add("box");
// containerEl.appendChild(boxEl);
// while (numberOfCircle > 0) {
//   const circleEl = document.createElement("div");
//   circleEl.id = `circle-${numberOfCircle}`;
//   circleEl.classList.add("circle");
//   boxEl.appendChild(circleEl);
//   numberOfCircle--;
// }

// containerEl.appendChild(boxEl);

// const totalNumberofCircle = boxEl.childNodes.length;

// function startAnimation() {
//   const circlePosArray = [];
//   for (let index = 0; index < totalNumberofCircle; index++) {
//     const item = boxEl.childNodes[index];
//     const initialCircleTop = window.getComputedStyle(item).top;
//     const initialCircleLeft = window.getComputedStyle(item).left;

//     circlePosArray.push([
//       parseInt(initialCircleTop),
//       parseInt(initialCircleLeft),
//     ]);
//   }
//   circlePosArray.forEach((coordinates, index) => {
//     let [x, y] = coordinates;

//     let initialRedX = Math.floor(Math.random() * 450);
//     let initialRedY = Math.floor(Math.random() * 450);
//     let directionRedX = 1;
//     let directionRedY = 1;
//     const item = boxEl.childNodes[index];

//     item.addEventListener("mouseenter", function () {
//       item.style.cursor = "pointer";
//     });
//     item.addEventListener("click", function () {
//       if (item) {
//         item.remove();
//       }
//     });

//     setInterval(() => {
//       initialRedX += directionRedX;
//       initialRedY += directionRedY;

//       if (initialRedX >= 450 || initialRedX <= 0) {
//         directionRedX *= -1;
//       }
//       if (initialRedY >= 450 || initialRedY <= 0) {
//         directionRedY *= -1;
//       }

//       item.style.top = initialRedY + "px";
//       item.style.left = initialRedX + "px";
//       x = parseInt(item.style.top);
//       y = parseInt(item.style.left);
//       circlePosArray[index] = [x, y];
//       collisionDetection(circlePosArray);
//       //
//     }, 5);
//   });

//   //   Animation
// }
// startAnimation();

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
  circleEl.classList.add("circle");
  circleEl.id = `circle-${index}`;

  circleEl.style.top = element.x + "px";
  circleEl.style.left = element.y + "px";
  boxEl.appendChild(circleEl);
});

const circleWrapper = boxEl.childNodes;

circleWrapper.forEach((element) => {
  console.log(element);
  element.addEventListener("mouseover", () => {
    element.style.cursor = "pointer";
  });
  element.addEventListener("click", () => {
    element.remove();
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
