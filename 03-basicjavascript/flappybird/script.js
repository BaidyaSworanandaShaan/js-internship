const gameContainerEl = document.querySelector(".game-container");
const backgroundImgEl = document.querySelector(".background-img");

const groundImgEl = document.querySelector(".ground-img");

let bgPosition = 0;
let leftPosition = 350;
let pipes = [];

function generateRandomHeight() {
  let firstHeight = Math.floor(Math.random() * (400 - 100)) + 51;
  let maxSecondHeight = 400 - firstHeight;

  let secondHeight = Math.floor(Math.random() * (maxSecondHeight - 50)) + 51;

  return { firstHeight, secondHeight };
}

const flappyBirdEl = document.createElement("div");
const flappyBirdImg = document.createElement("img");
flappyBirdImg.src = "img/flappy-bird.png";
flappyBirdEl.classList.add("flappyBird-img");
flappyBirdEl.style.top = "250px";
flappyBirdEl.appendChild(flappyBirdImg);
backgroundImgEl.appendChild(flappyBirdEl);

const handleKeyDown = function (event) {
  if (event.code === "Space") {
    flappyBirdEl.style.top = parseInt(flappyBirdEl.style.top) - 40 + "px";
    event.preventDefault();
  }
};
document.addEventListener("keydown", handleKeyDown);

function createPipe() {
  const { firstHeight, secondHeight } = generateRandomHeight();

  const pipeTopEl = document.createElement("div");
  pipeTopEl.classList.add("pipe");
  pipeTopEl.classList.add("pipe-top");
  pipeTopEl.style.left = leftPosition + "px";
  pipeTopEl.style.height = firstHeight + "px";
  backgroundImgEl.appendChild(pipeTopEl);
  pipes.push(pipeTopEl);
  const pipeBottomEl = document.createElement("div");
  pipeBottomEl.classList.add("pipe");
  pipeBottomEl.classList.add("pipe-bottom");
  pipeBottomEl.style.left = leftPosition + "px";
  pipeBottomEl.style.height = secondHeight + "px";
  backgroundImgEl.appendChild(pipeBottomEl);
  pipes.push(pipeBottomEl);
}

function gameOverCondition() {
  clearInterval(gameLoop);
  clearInterval(pipeLoop);
  document.removeEventListener("keydown", handleKeyDown);
}

function collisionDetection(pipe) {
  let extraLeftPadding = 40;
  let extraHeightPadding = 7;
  // With ground
  if (flappyBirdEl.offsetTop > groundImgEl.offsetTop - 40) {
    console.log("COLLIDE");
    gameOverCondition();
  }

  // With pipes
  if (pipe.classList.contains("pipe-top")) {
    if (pipe.offsetLeft + pipe.offsetWidth > flappyBirdEl.offsetLeft) {
      if (
        flappyBirdEl.offsetLeft + extraLeftPadding >= pipe.offsetLeft &&
        flappyBirdEl.offsetTop + extraHeightPadding <
          pipe.offsetTop + pipe.offsetHeight
      ) {
        console.log("COLLIDE TOP");
        gameOverCondition();
      }
    }
  } else if (pipe.classList.contains("pipe-bottom")) {
    if (pipe.offsetLeft + pipe.offsetWidth > flappyBirdEl.offsetLeft) {
      if (
        flappyBirdEl.offsetLeft + extraLeftPadding >= pipe.offsetLeft &&
        flappyBirdEl.offsetTop > pipe.offsetTop - extraLeftPadding
      ) {
        console.log("BOTTOM PIPE COLLISION");
        gameOverCondition();
      }
    }
  }
}
const gameLoop = setInterval(() => {
  bgPosition -= 2;
  groundImgEl.style.backgroundPosition = `${bgPosition}px 0px`;

  flappyBirdEl.style.top = parseInt(flappyBirdEl.style.top) + 1.8 + "px";
  pipes.forEach((pipe) => {
    let pipeLeft = parseInt(pipe.style.left);
    pipe.style.left = `${pipeLeft - 2}px`;

    if (pipeLeft <= 1) {
      pipe.remove();
    }
    collisionDetection(pipe);
  });
}, 15);

const pipeLoop = setInterval(() => {
  createPipe();
}, 2000);
