class GameObject {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() < 0.5 ? -2 : 2;
    this.dy = Math.random() < 0.5 ? -2 : 2;
    this.type = type;
  }
}
class Game {
  constructor() {
    this.gameContainerEl = document.getElementById("game-box");
    this.gameState = [];
    this.gameOver = false;
    this.paperCountEl = document.getElementById("paper-count");
    this.scissorsCountEl = document.getElementById("scissors-count");
    this.rockCountEl = document.getElementById("rock-count");
    this.winnerEl = document.getElementById("winner");
    this.btnRestartEl = document.getElementById("btn--restart");
    this.init();
  }
  init() {
    for (let i = 0; i < 10; i++) {
      let type;
      if (i < 3) type = "Paper";
      else if (i < 6) type = "Scissors";
      else type = "Rock";

      this.gameState.push(
        new GameObject(Math.random() * 550, Math.random() * 550, type)
      );
    }
    this.renderGameObjects();
    this.gameLoopId = setInterval(() => this.gameLoop(), 25);
  }
  renderGameObjects() {
    this.gameState.forEach((element, index) => {
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
      this.gameContainerEl.appendChild(gameElement);
    });
  }

  gameLoop() {
    this.gameState.forEach((item, index) => {
      item.x += item.dx;
      item.y += item.dy;
      if (item.x >= 550 || item.x <= 0) {
        item.dx *= -1;
      }
      if (item.y >= 550 || item.y <= 0) {
        item.dy *= -1;
      }
    });
    this.collisionDetection();
    this.render();
  }

  collisionDetection() {
    for (let i = 0; i < this.gameState.length; i++) {
      for (let j = i + 1; j < this.gameState.length; j++) {
        let obj1 = this.gameState[i];
        let obj2 = this.gameState[j];

        let dx = obj2.x - obj1.x;
        let dy = obj2.y - obj1.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 51) {
          const winnerIndex = this.findWinner(obj1, obj2);
          const loserIndex =
            winnerIndex === this.gameState.indexOf(obj1)
              ? this.gameState.indexOf(obj2)
              : this.gameState.indexOf(obj1);

          this.updateImage(loserIndex, winnerIndex);
          this.updateCount();
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
  updateImage(loserIndex, winnerIndex) {
    const loserEl = document.querySelector(`#el-${loserIndex} img`);
    const winnerEl = document.querySelector(`#el-${winnerIndex} img`);

    if (loserEl && winnerEl) {
      loserEl.src = winnerEl.src;
      this.gameState[loserIndex].type = this.gameState[winnerIndex].type;
    }
  }
  render() {
    this.gameState.forEach((element, index) => {
      const el = document.getElementById(`el-${index}`);

      if (el) {
        el.style.top = element.y + "px";
        el.style.left = element.x + "px";
      }
    });
  }
  findWinner(obj1, obj2) {
    if (obj1.type === obj2.type) {
      console.log("Draw");
      return "Draw";
    }

    if (
      (obj1.type === "Paper" && obj2.type === "Rock") ||
      (obj1.type === "Scissors" && obj2.type === "Paper") ||
      (obj1.type === "Rock" && obj2.type === "Scissors")
    ) {
      console.log(`${obj1.type} wins`);
      return this.gameState.indexOf(obj1);
    } else {
      console.log(`${obj2.type} wins`);
      return this.gameState.indexOf(obj2);
    }
  }
  gameOverCondition(winner) {
    this.gameContainerEl.innerHTML = "";
    this.winnerEl.textContent = "Final Winner : " + winner;
    this.gameContainerEl.appendChild(this.winnerEl);
    this.btnRestartEl.style.display = "block";
    this.gameContainerEl.appendChild(this.btnRestartEl);
    this.btnRestartEl.addEventListener("click", () => {
      location.reload();
    });
  }
  updateCount() {
    let paperCount = this.gameState.filter(
      (element) => element.type === "Paper"
    ).length;
    let scissorsCount = this.gameState.filter(
      (element) => element.type === "Scissors"
    ).length;
    let rockCount = this.gameState.filter(
      (element) => element.type === "Rock"
    ).length;
    this.paperCountEl.textContent = paperCount;
    this.scissorsCountEl.textContent = scissorsCount;
    this.rockCountEl.textContent = rockCount;

    if ([paperCount, scissorsCount, rockCount].includes(10)) {
      clearInterval(this.gameLoopId);
      this.gameOverCondition(
        paperCount === 10 ? "Paper" : scissorsCount === 10 ? "Scissors" : "Rock"
      );
    }
  }
}

const startGame = new Game();
