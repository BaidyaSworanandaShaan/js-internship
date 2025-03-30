class Game {
  constructor() {
    this.gameContainerEl = document.querySelector(".game-container");
    this.backgroundImgEl = document.querySelector(".background-img");
    this.groundImgEl = document.querySelector(".ground-img");
    this.gameScoreEl = document.querySelector(".game-score h2");
    this.pipes = [];
    this.bgPosition = 0;
    this.bird = new Bird(this);
    this.gameScore = 0;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.init();
  }

  init() {
    this.gameLoop = setInterval(() => this.startingPoint(), 15);
    this.pipeGeneration = setInterval(() => {
      this.pipes.push(new Pipe(this.bird, this));
    }, 2000);

    document.body.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    this.bird.handleKeyDown(event);
  }

  startingPoint() {
    this.bgPosition -= 2;
    this.groundImgEl.style.backgroundPosition = `${this.bgPosition}px 0px`;
    this.bird.flappyBirdEl.style.top =
      parseInt(this.bird.flappyBirdEl.style.top) + 1.8 + "px";

    // Move pipes
    this.pipes.forEach((pipe) => pipe.pipeMovement());
  }

  gameOverCondition() {
    clearInterval(this.gameLoop);
    clearInterval(this.pipeGeneration);
    const finalCordinate =
      this.backgroundImgEl.offsetHeight - this.groundImgEl.offsetHeight - 50;

    const fallInterval = setInterval(() => {
      let currentTop = parseInt(this.bird.flappyBirdEl.style.top);

      if (currentTop < finalCordinate) {
        this.bird.flappyBirdEl.style.top = currentTop + 5 + "px";
      } else {
        clearInterval(this.fallInterval);
      }
    }, 20);
    document.body.removeEventListener("keydown", this.handleKeyDown);

    this.bird.flappyBirdEl.classList.add("flappyBird-img--dead");

    const hitSound = new Audio("music/flappy_hit.mp3");
    hitSound.currentTime = 0;
    hitSound.play();

    setTimeout(() => {
      const dieSound = new Audio("music/flappy_die.mp3");
      dieSound.currentTime = 0;
      dieSound.play();
    }, 500);
  }
}

class Pipe {
  constructor(bird, game) {
    this.bird = bird;
    this.game = game;
    this.leftPosition = 350;

    this.create();
  }

  create() {
    const { firstHeight, secondHeight } = this.generateRandomHeight();

    this.pipeTopEl = document.createElement("div");
    this.pipeTopEl.classList.add("pipe", "pipe-top");
    this.pipeTopEl.style.left = this.leftPosition + "px";
    this.pipeTopEl.style.height = firstHeight + "px";
    this.game.backgroundImgEl.appendChild(this.pipeTopEl);

    this.pipeBottomEl = document.createElement("div");
    this.pipeBottomEl.classList.add("pipe", "pipe-bottom");
    this.pipeBottomEl.style.left = this.leftPosition + "px";
    this.pipeBottomEl.style.height = secondHeight + "px";
    this.game.backgroundImgEl.appendChild(this.pipeBottomEl);
  }

  pipeMovement() {
    [this.pipeTopEl, this.pipeBottomEl].forEach((pipe) => {
      const pipeLeft = parseInt(pipe.style.left);
      pipe.style.left = `${pipeLeft - 2}px`;
      const mySet = new Set();

      if (pipeLeft <= -50) {
        pipe.remove();
      }

      this.collisionDetection(pipe);
      if (
        !this.passed &&
        pipeLeft + pipe.offsetWidth < this.bird.flappyBirdEl.offsetLeft
      ) {
        this.passed = true;
        const pointSound = new Audio("music/flappy_point.mp3");
        pointSound.currentTime = 0;
        pointSound.play();

        this.game.gameScore++;
        console.log(this.game.gameScore);
        console.log(this.game.gameScoreEl);
        this.game.gameScoreEl.textContent = this.game.gameScore;
      }
    });
  }
  pointCount(pipe) {}
  collisionDetection(pipe) {
    let extraLeftPadding = 40;
    let extraHeightPadding = 7;

    if (
      this.bird.flappyBirdEl.offsetTop >
      this.game.backgroundImgEl.offsetHeight - 40
    ) {
      console.log("COLLIDE");
      this.game.gameOverCondition();
    }

    if (pipe.classList.contains("pipe-top")) {
      if (
        pipe.offsetLeft + pipe.offsetWidth >
          this.bird.flappyBirdEl.offsetLeft &&
        this.bird.flappyBirdEl.offsetLeft + extraLeftPadding >=
          pipe.offsetLeft &&
        this.bird.flappyBirdEl.offsetTop + extraHeightPadding <
          pipe.offsetTop + pipe.offsetHeight
      ) {
        console.log("COLLIDE TOP");
        this.game.gameOverCondition();
      }
    } else if (pipe.classList.contains("pipe-bottom")) {
      if (
        pipe.offsetLeft + pipe.offsetWidth >
          this.bird.flappyBirdEl.offsetLeft &&
        this.bird.flappyBirdEl.offsetLeft + extraLeftPadding >=
          pipe.offsetLeft &&
        this.bird.flappyBirdEl.offsetTop > pipe.offsetTop - extraLeftPadding
      ) {
        console.log("BOTTOM PIPE COLLISION");
        this.game.gameOverCondition();
      }
    }
  }

  generateRandomHeight() {
    let firstHeight = Math.floor(Math.random() * (300 - 100)) + 50;
    let secondHeight = 400 - firstHeight - 100;
    return { firstHeight, secondHeight };
  }
}

class Bird {
  constructor(game) {
    this.game = game;
    this.flappyBirdEl = document.createElement("div");
    this.flappyBirdImg = document.createElement("img");
    this.flappyBirdImg.src = "img/flappy-bird.png";
    this.flappyBirdEl.classList.add("flappyBird-img");
    this.flappyBirdEl.style.top = "250px";
    this.flappyBirdEl.appendChild(this.flappyBirdImg);
    this.game.backgroundImgEl.appendChild(this.flappyBirdEl);
  }

  fallBird() {
    let currentTop = parseInt(this.flappyBirdEl.style.top);
    if (
      currentTop <
      this.game.backgroundImgEl.offsetHeight -
        this.game.groundImgEl.offsetHeight -
        50
    ) {
      this.flappyBirdEl.style.top = currentTop + 5 + "px";
    } else {
      clearInterval(this.game.fallInterval);
    }
  }

  handleKeyDown(event) {
    if (event.code === "Space") {
      const flySound = new Audio("music/flappy_whoosh.mp3");
      flySound.currentTime = 0;
      flySound.play();
      this.flappyBirdEl.style.top =
        parseInt(this.flappyBirdEl.style.top) - 40 + "px";
      event.preventDefault();
    }
  }
}

// Initialize Game
new Game();
