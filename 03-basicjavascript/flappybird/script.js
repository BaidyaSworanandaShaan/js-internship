const flySound = new Audio("music/flappy_whoosh.mp3");
const hitSound = new Audio("music/flappy_hit.mp3");
const pointSound = new Audio("music/flappy_point.mp3");
const dieSound = new Audio("music/flappy_die.mp3");

const gameContainerEl = document.querySelector(".game-container");
const backgroundImgEl = document.querySelector(".background-img");

const groundImgEl = document.querySelector(".ground-img");
const flappyBirdEl = document.createElement("div");
const flappyBirdImg = document.createElement("img");

flappyBirdImg.src = "img/flappy-bird.png";
flappyBirdEl.classList.add("flappyBird-img");
flappyBirdEl.style.top = "250px";
flappyBirdEl.appendChild(flappyBirdImg);
backgroundImgEl.appendChild(flappyBirdEl);
let bgPosition = 0;
let leftPosition = 350;
let pipes = [];
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

function generateRandomHeight() {
  let firstHeight = Math.floor(Math.random() * (400 - 100)) + 51;
  let maxSecondHeight = 400 - firstHeight;

  let secondHeight = Math.floor(Math.random() * (maxSecondHeight - 50)) + 51;

  return { firstHeight, secondHeight };
}

const handleKeyDown = function (event) {
  if (event.code === "Space") {
    flySound.currentTime = 0;
    flySound.play();
    flappyBirdEl.style.top = parseInt(flappyBirdEl.style.top) - 40 + "px";
    event.preventDefault();
  }
};

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
  console.log("Ground Position:", groundImgEl.offsetTop);

  const finalCordinate =
    backgroundImgEl.offsetHeight - groundImgEl.offsetHeight - 50;

  const fallInterval = setInterval(() => {
    let currentTop = parseInt(flappyBirdEl.style.top);

    if (currentTop < finalCordinate) {
      flappyBirdEl.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(fallInterval);
    }
  }, 20);

  flappyBirdEl.classList.add("flappyBird-img--dead");
  hitSound.currentTime = 0;
  hitSound.play();

  clearInterval(gameLoop);
  clearInterval(pipeLoop);
  document.removeEventListener("keydown", handleKeyDown);

  setTimeout(() => {
    dieSound.currentTime = 0;
    dieSound.play();
  }, 500);
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
document.addEventListener("keydown", handleKeyDown);
