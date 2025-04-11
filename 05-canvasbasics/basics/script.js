// let canvas = document.querySelector("canvas");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let c = canvas.getContext("2d");
// c.fillStyle = "blue";
// c.fillRect(100, 100, 50, 50);
// c.fillStyle = "green";
// c.fillRect(200, 200, 50, 50);
// c.fillStyle = "red";
// c.fillRect(300, 300, 50, 50);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 50);
// c.lineTo(400, 50);
// c.lineTo(500, 50);
// c.strokeStyle = "red";
// c.stroke();
// function getRandomRgbColor() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// }
// for (let i = 0; i < 100; i++) {
//   // Arc/Circle

//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   let randomColor = getRandomRgbColor();
//   c.beginPath();
//   c.arc(x, y, 40, 0, Math.PI * 2, false);
//   c.strokeStyle = randomColor;

//   c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined,
};
let maxRadius = 40;

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener("resize", function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");
const colorArray = [
  "#FFDDC1",
  "#D4A5A5",
  "#A8E6CF",
  "#D3C1E5",
  "#F6EAC2",
  "#B5EAD7",
];
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}
let circleArray = [];
function init() {
  circleArray = [];
  for (let index = 0; index < 500; index++) {
    let radius = Math.random() * 10 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();
