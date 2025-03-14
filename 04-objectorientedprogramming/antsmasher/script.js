class Ant {
  constructor(id, x, y, dx, dy, container) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.container = container;
    this.element = this.createElement();
  }
  createElement() {
    const circleEl = document.createElement("div");
    const img = document.createElement("img");

    img.src = "img/ant.png";
    img.width = 50;
    img.height = 50;

    circleEl.classList.add("circle");
    circleEl.id = `circle-${this.id}`;
    circleEl.style.top = `${this.y}px`;
    circleEl.style.left = `${this.x}px`;

    circleEl.appendChild(img);
    this.container.appendChild(circleEl);

    circleEl.addEventListener("mouseover", () => {
      circleEl.style.cursor = "pointer";
    });

    circleEl.addEventListener("click", () => {
      this.antSmash();
    });
    return circleEl;
  }
  antSmash() {
    const deadAnt = this.element.querySelector("img");
    deadAnt.src = "img/blood.png";
    const smashEffect = new Audio("music/smash.mp3");
    smashEffect.play();
    setTimeout(() => {
      this.element.remove();
    }, 300);
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x >= 450 || this.x <= 0) this.dx *= -1;
    if (this.y >= 450 || this.y <= 0) this.dy *= -1;

    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

class mainGame {
  constructor(containerId) {
    this.containerEl = document.getElementById(containerId);
    this.boxEl = document.createElement("div");
    this.boxEl.classList.add("box");
    this.containerEl.appendChild(this.boxEl);
    this.ants = [];
    this.init();
  }
  init() {
    const initialState = [
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
    this.ants = initialState.map(
      (state, index) =>
        new Ant(index, state.x, state.y, state.dx, state.dy, this.boxEl)
    );
    this.gameLoopId = setInterval(() => this.gameLoop(), 25);
  }
  collisionDetection() {
    for (let i = 0; i < this.ants.length; i++) {
      for (let j = i + 1; j < this.ants.length; j++) {
        let obj1 = this.ants[i];
        let obj2 = this.ants[j];

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
  gameLoop() {
    this.ants.forEach((ant) => ant.move());
    this.collisionDetection();
  }
}
new mainGame("container");
