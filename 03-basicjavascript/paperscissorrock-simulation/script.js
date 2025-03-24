const gameContainerEl = document.getElementById("game-box");

const paperCountEl = document.getElementById("paper-count");
const scissorsCountEl = document.getElementById("scissors-count");
const rockCountEl = document.getElementById("rock-count");
const winnerEl = document.getElementById("winner");
const btnRestartEl = document.getElementById("btn--restart");

let gameState = [];
let paperCount;
let rockCount;
let scissorsCount;
let gameOver = false;
for (let i = 0; i < 10; i++) {
  let type;
  if (i < 3) type = "Paper";
  else if (i < 6) type = "Scissors";
  else type = "Rock";

  gameState.push({
    x: Math.floor(Math.random() * 550),
    y: Math.floor(Math.random() * 550),
    dx: Math.random() < 0.5 ? -2 : 2,
    dy: Math.random() < 0.5 ? -2 : 2,
    type,
  });
}

function findWinner(obj1, obj2) {
  if (obj1.type === obj2.type) {
    console.log("Draw");
    return "Draw";
  }

  console.log(`Match: ${obj1.type} vs ${obj2.type}`);

  if (
    (obj1.type === "Paper" && obj2.type === "Rock") ||
    (obj1.type === "Scissors" && obj2.type === "Paper") ||
    (obj1.type === "Rock" && obj2.type === "Scissors")
  ) {
    console.log(`${obj1.type} wins`);
    return gameState.indexOf(obj1);
  } else {
    console.log(`${obj2.type} wins`);
    return gameState.indexOf(obj2);
  }
}

function updateImage(loserIndex, winnerIndex) {
  const loserEl = document.querySelector(`#el-${loserIndex} img`);
  const winnerEl = document.querySelector(`#el-${winnerIndex} img`);

  if (loserEl && winnerEl) {
    loserEl.src = winnerEl.src;
    gameState[loserIndex].type = gameState[winnerIndex].type;
  }
}

function gameOverCondition(winner) {
  gameContainerEl.innerHTML = "";
  winnerEl.textContent = "Final Winner : " + winner;
  gameContainerEl.appendChild(winnerEl);
  btnRestartEl.style.display = "block";
  gameContainerEl.appendChild(btnRestartEl);
  btnRestartEl.addEventListener("click", () => {
    location.reload();
  });
}
function updateCount() {
  const paperElements = gameState.filter((element) => element.type === "Paper");
  const scissorsElements = gameState.filter(
    (element) => element.type === "Scissors"
  );
  const rockElements = gameState.filter((element) => element.type === "Rock");

  paperCountEl.textContent = paperElements.length;
  scissorsCountEl.textContent = scissorsElements.length;
  rockCountEl.textContent = rockElements.length;

  if (
    paperElements.length === 10 ||
    scissorsElements.length === 10 ||
    rockElements.length === 10
  ) {
    gameOver = true;
    clearInterval(gameLoopId);
    if (paperElements.length === 10) {
      gameOverCondition("Paper");
    } else if (scissorsElements.length === 10) {
      gameOverCondition("Scissor");
    } else {
      gameOverCondition("Rock");
    }
  }
}
function collisionDetection() {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = i + 1; j < gameState.length; j++) {
      let obj1 = gameState[i];
      let obj2 = gameState[j];

      let dx = obj2.x - obj1.x;
      let dy = obj2.y - obj1.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 51) {
        const winnerIndex = findWinner(obj1, obj2);
        const loserIndex =
          winnerIndex === gameState.indexOf(obj1)
            ? gameState.indexOf(obj2)
            : gameState.indexOf(obj1);

        updateImage(loserIndex, winnerIndex);
        updateCount();
        // Chat GPT Referred for algorithm
        let overlap = 51 - distance;

        let nx = dx / distance;
        let ny = dy / distance;

        obj1.x -= nx * (overlap / 2);
        obj1.y -= ny * (overlap / 2);
        obj2.x += nx * (overlap / 2);
        obj2.y += ny * (overlap / 2);

        obj1.dx *= -1;
        obj1.dy *= -1;
        obj2.dx *= -1;
        obj2.dy *= -1;
      }
    }
  }
}

gameState.forEach((element, index) => {
  console.log(element);
  const gameElement = document.createElement("div");
  gameElement.id = `el-${index}`;
  gameElement.style.position = "absolute";
  gameElement.style.top = element.y + "px";
  gameElement.style.left = element.x + "px";

  const img = document.createElement("img");
  img.width = 50;
  img.height = 50;
  if (index < 3) {
    img.src = "img/paper.png";
    img.id = `paper-${index}`;
  } else if (index < 6) {
    img.src = "img/scissors.png";
    img.id = `scissors-${index}`;
  } else {
    img.src = "img/stone.png";
    img.id = `stone-${index}`;
  }
  gameElement.appendChild(img);
  gameContainerEl.appendChild(gameElement);
});

const gameLoopId = setInterval(gameLoop, 25);

function gameLoop() {
  gameState.forEach((item, index) => {
    item.x += item.dx;
    item.y += item.dy;
    if (item.x >= 550 || item.x <= 0) {
      item.dx *= -1;
    }
    if (item.y >= 550 || item.y <= 0) {
      item.dy *= -1;
    }
  });
  collisionDetection();
  render(gameState);
}
function render(gameState) {
  gameState.forEach((element, index) => {
    const el = document.getElementById(`el-${index}`);

    if (el) {
      el.style.top = element.y + "px";
      el.style.left = element.x + "px";
    }
  });
}
