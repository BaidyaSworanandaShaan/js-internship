class Game {
  constructor() {
    this.gamePointEffect = new Audio("sound/gamepoints.wav");
    this.gameOverEffect = new Audio("sound/gameover.wav");

    this.bulletContainer = document.getElementById("bullet-container");
    this.asteroidEl = document.getElementById("asteroid");
    this.backgroundEl = document.querySelector(".background");
    this.gameOverEl = document.querySelector(".gameover-container");
    this.finalScoreEl = document.getElementById("final-score");
    this.highScoreEl = document.getElementById("high-score");
    this.resetBtn = document.getElementById("reset-btn");

    this.backgroundHeight = 600;
    this.gameOver = false;
    this.bgPosition = 0;
    this.finalScore = 0;
    this.enemyCount = 1;

    this.rocket = new Rocket(this);
    this.init();
  }
  init() {
    this.backgroundLoop = setInterval(() => this.updateBackground(), 15);
    document.body.addEventListener("keydown", (event) => {
      this.handleKeyDown(event);
    });
    this.resetBtn.addEventListener("click", () => {
      location.reload();
    });
    this.spawnId = setInterval(() => this.generateEnemies(), 500);
  }
  updateBackground() {
    this.bgPosition += 2;
    this.backgroundEl.style.backgroundPosition = `0px ${this.bgPosition}px`;
  }
  handleKeyDown(event) {
    const key = event.key;
    if (event.code === "Space" && !this.gameOver) {
      this.executeBullets();
    }
    this.rocket.switchPosition(key);
  }

  executeBullets() {
    const bullet = new Bullet(
      this.rocket.element,
      this.bulletContainer,
      this.backgroundHeight,
      this.gamePointEffect,
      this.asteroidEl,
      this
    );
    bullet.fire();
  }

  generateEnemies() {
    const enemy = new Enemy(
      this.asteroidEl,
      this.backgroundHeight,
      this.rocket.element,
      this
    );
    enemy.fall();
    this.enemyCount++;
  }

  endGame() {
    this.gameOver = true;
    document.querySelectorAll(".asteroid-img").forEach((enemy) => {
      this.asteroidEl.removeChild(enemy);
    });
    this.rocket.element.style.opacity = "0.4";
    this.finalScoreEl.textContent = String(this.finalScore);
    let highScore = localStorage.getItem("highScore") || 0;
    if (localStorage.getItem("highScore") === null) {
      localStorage.setItem("highScore", this.finalScore);
      this.highScoreEl.textContent = String(this.finalScore);
    } else {
      highScore = Number(highScore);
      if (this.finalScore > highScore) {
        localStorage.setItem("highScore", this.finalScore);
        this.highScoreEl.textContent = String(this.finalScore);
      }
    }

    this.gameOverEffect.play();
    clearInterval(this.spawnId);
    clearInterval(this.fallInterval);
    clearInterval(this.backgroundLoop);
    this.gameOverEl.style.display = "flex";
  }
}

class Rocket {
  constructor(game) {
    this.game = game;
    this.element = document.querySelector("#rocket img");
    this.currentPosition = parseInt(this.element.style.left);
    this.lane = 1;
  }
  switchPosition(key) {
    if (this.game.gameOver) {
      console.log("GAME OVER");
    } else if (key === "ArrowLeft" && this.lane > 1) {
      this.currentPosition -= 40;

      this.lane--;
    } else if (key === "ArrowRight" && this.lane < 3) {
      this.currentPosition += 40;

      this.lane++;
    }

    this.element.style.left = this.currentPosition + "%";
  }
}

class Bullet {
  constructor(
    rocketEl,
    bulletContainer,
    backgroundHeight,
    gamePointEffect,
    asteroidEl,
    game
  ) {
    this.rocketEl = rocketEl;
    this.bulletContainer = bulletContainer;
    this.backgroundHeight = backgroundHeight;
    this.gamePointEffect = gamePointEffect;
    this.asteroidEl = asteroidEl;
    this.game = game;
  }

  fire() {
    const bullet = document.createElement("img");
    bullet.src = "img/bullet.png";
    bullet.classList.add("bullet");
    bullet.style.width = "2%";
    bullet.style.bottom = "90px";
    this.bulletContainer.appendChild(bullet);

    bullet.style.left =
      this.rocketEl.offsetLeft + this.rocketEl.width / 2 - 5 + "px";

    let bulletInterval = setInterval(() => {
      let currentBottom = parseInt(bullet.style.bottom) || 0;
      bullet.style.bottom = currentBottom + 10 + "px";

      if (currentBottom >= this.backgroundHeight) {
        clearInterval(bulletInterval);
        this.bulletContainer.removeChild(bullet);
      }
      document.querySelectorAll(".asteroid-img").forEach((enemy) => {
        if (
          bullet.offsetLeft < enemy.offsetLeft + 50 &&
          bullet.offsetLeft + 50 > enemy.offsetLeft &&
          bullet.offsetTop < enemy.offsetTop + 50 &&
          bullet.offsetTop + 50 > enemy.offsetTop
        ) {
          console.log("BULLET HIT ENEMY!");
          this.game.finalScore += 10;
          this.gamePointEffect.currentTime = 0;
          this.gamePointEffect.play();
          clearInterval(bulletInterval);
          this.bulletContainer.removeChild(bullet);
          this.asteroidEl.removeChild(enemy);
        }
      });
    }, 50);
  }
}

class Enemy {
  constructor(asteroidEl, backgroundHeight, rocketEl, game) {
    this.asteroidEl = asteroidEl;
    this.backgroundHeight = backgroundHeight;
    this.rocketEl = rocketEl;
    this.game = game;
  }

  fall() {
    const enemy = document.createElement("img");
    enemy.id = "enemy" + this.game.enemyCount;
    enemy.src = "img/asteroid.png";
    enemy.style.width = "10%";
    let enemyLane = Math.floor(Math.random() * 3);
    enemy.style.left = 5 + 40 * enemyLane + "%";
    enemy.classList.add("asteroid-img");

    this.asteroidEl.appendChild(enemy);
    let fallInterval = setInterval(() => {
      let currentTop = parseInt(enemy.style.top) || 0;
      enemy.style.top = currentTop + 10 + "px";

      if (currentTop >= this.backgroundHeight) {
        this.game.finalScore += 5;
        clearInterval(fallInterval);
        this.asteroidEl.removeChild(enemy);
      }

      if (
        this.rocketEl.offsetLeft < enemy.offsetLeft + 50 &&
        this.rocketEl.offsetLeft + 50 > enemy.offsetLeft &&
        this.rocketEl.offsetTop < enemy.offsetTop + 50 &&
        this.rocketEl.offsetTop + 50 > enemy.offsetTop
      ) {
        console.log("COLLIDE");
        this.game.endGame();
        clearInterval(fallInterval);
        // Game Over Condition
      }
    }, 25);
  }
}

const game = new Game();
