const bulletContainer = document.getElementById("bullet-container");
const rocketEl = document.querySelector("#rocket img");
const asteroidEl = document.getElementById("asteroid");
const backgroundEl = document.querySelector(".background");
let currentRocketPostion = parseInt(rocketEl.style.left);
let currentBulletContainer = parseInt(bulletContainer.style.left);
let rocketLane = 1;
let backgroundHeight = 600;
let gameOver = false;
let bgPosition = 0;

const backgroundLoop = setInterval(() => {
  bgPosition += 2;
  backgroundEl.style.backgroundPosition = `0px ${bgPosition}px`;
}, 15);

document.body.addEventListener("keydown", function (event) {
  const key = event.key;
  if (event.code === "Space" && !gameOver) {
    executeBullets();
  }
  switchPosition(key);
});

function executeBullets() {
  const bullet = document.createElement("img");
  bullet.src = "img/bullet.png";
  bullet.classList.add("bullet");
  bullet.style.width = "2%";
  bullet.style.bottom = "90px";
  bulletContainer.appendChild(bullet);

  bullet.style.left = rocketEl.offsetLeft + rocketEl.width / 2 - 5 + "px"; // Refereed from GPT
  let bulletInterval = setInterval(() => {
    let currentBottom = parseInt(bullet.style.bottom) || 0;
    bullet.style.bottom = currentBottom + 10 + "px";

    if (currentBottom >= backgroundHeight) {
      clearInterval(bulletInterval);
      bulletContainer.removeChild(bullet);
    }
    document.querySelectorAll(".asteroid-img").forEach((enemy) => {
      if (
        bullet.offsetLeft < enemy.offsetLeft + 50 &&
        bullet.offsetLeft + 50 > enemy.offsetLeft &&
        bullet.offsetTop < enemy.offsetTop + 50 &&
        bullet.offsetTop + 50 > enemy.offsetTop
      ) {
        console.log("BULLET HIT ENEMY!");
        clearInterval(bulletInterval);
        bulletContainer.removeChild(bullet);
        asteroidEl.removeChild(enemy);
      }
    });
  }, 50);
}

function switchPosition(key) {
  if (gameOver) {
    console.log("GAME OVER");
  } else if (key === "ArrowLeft" && rocketLane > 1) {
    currentRocketPostion -= 40;

    rocketLane--;
  } else if (key === "ArrowRight" && rocketLane < 3) {
    currentRocketPostion += 40;

    rocketLane++;
  }

  rocketEl.style.left = currentRocketPostion + "%";
}

const spawnId = setInterval(generateEnemies, 1000);
let count = 0;
let enemyCount = 1;

function generateEnemies() {
  const enemy = document.createElement("img");
  enemy.id = "enemy" + enemyCount;
  enemy.src = "img/asteroid.png";
  enemy.style.width = "10%";
  let enemyLane = Math.floor(Math.random() * 3);
  enemy.style.left = 5 + 40 * enemyLane + "%";
  enemy.classList.add("asteroid-img");

  asteroidEl.appendChild(enemy);
  count++;
  enemyCount++;
  let fallInterval = setInterval(() => {
    let currentTop = parseInt(enemy.style.top) || 0;
    enemy.style.top = currentTop + 10 + "px";

    if (currentTop >= backgroundHeight) {
      clearInterval(fallInterval);
      asteroidEl.removeChild(enemy);
    }
    // console.log(rocketEl.offsetLeft, rocketEl.offsetTop);
    if (
      rocketEl.offsetLeft < enemy.offsetLeft + 50 &&
      rocketEl.offsetLeft + 50 > enemy.offsetLeft &&
      rocketEl.offsetTop < enemy.offsetTop + 50 &&
      rocketEl.offsetTop + 50 > enemy.offsetTop
    ) {
      console.log("COLLIDE");
      // Game Over Condition
      gameOver = true;
      clearInterval(spawnId);
      clearInterval(fallInterval);
      clearInterval(backgroundLoop);
    }
  }, 50);
}
