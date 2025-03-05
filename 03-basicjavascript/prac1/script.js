const generateRandomColor = function () {
  const hexCharacters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * hexCharacters.length);
    color += hexCharacters[randomNumber];
  }
  return color;
};

const btnSubmit = document.getElementById("btn-submit");
const outputSection = document.getElementById("output");
let notInitialised = true;
function drawInitialRectangle(size) {
  if (notInitialised) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr[i] = [];
      }
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr[i][j] = 0;
        const box = document.createElement("div");
        box.id = `container${i}-${j}`;
        box.className = "container--white";
        output.appendChild(box);
      }
      const breakline = document.createElement("br");
      output.appendChild(breakline);
    }
    notInitialised = false;
    return arr;
  }
}

function drawRectangle(size) {
  const arr = drawInitialRectangle(size);
  let sizeofRect = size;
  let x = 0;
  y = 0;
  let delay = 0;
  while (sizeofRect > 0) {
    console.log(sizeofRect);
    console.log(x, y);

    for (let i = x; i < sizeofRect + x; i++) {
      for (let j = y; j < sizeofRect + y; j++) {
        if (
          i == x ||
          j == y ||
          i === sizeofRect + x - 1 ||
          j === sizeofRect + x - 1
        ) {
          setTimeout(() => {
            arr[i][j] = 1;
            const box = document.getElementById(`container${i}-${j}`);
            let randomColor = generateRandomColor();
            console.log(randomColor);
            if (box != null) {
              console.log(box);
              box.style.backgroundColor = randomColor;
            }
          }, delay * 100);
          delay++;
        }
      }
    }
    x = x + 2;
    y = y + 2;

    sizeofRect = sizeofRect - 4;
  }

  return arr;
}
btnSubmit.addEventListener("click", function () {
  const dimension = document.getElementById("input-text").value;
  console.log(drawRectangle(Number(dimension)));
});
