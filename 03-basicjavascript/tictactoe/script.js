const containerEl = document.getElementById("main-container");
const gameBoard = document.getElementById("main-gameboard");
const playerTurnEl = document.getElementById("player-turn");
const resultEl = document.getElementById("result");
const btnResetEl = document.getElementById("btn--reset");

let playerOne = true;
let winningCondition = false;
// Create UI ELEMENTS

// RESET CONDITION
btnResetEl.addEventListener("click", function () {
  gameBoard.childNodes.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("o-color");
    cell.classList.remove("x-color");
    console.log(cell);
  });
  playerOne = true;
  winningCondition = false;
  resultEl.textContent = "TURN";
  playerTurnEl.textContent = "X";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameMatrix[i][j] = "";
    }
  }
  console.log(gameMatrix);
});
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement("div");
    cell.id = `cell-${i}-${j}`;
    cell.classList.add("cell");
    cell.textContent = "";
    gameBoard.appendChild(cell);
  }
}

// Matrix for Tic Tac Toe
const gameMatrix = new Array();

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    gameMatrix[i] = [];
  }
}
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const selectedCell = document.getElementById(`cell-${i}-${j}`);
    gameMatrix[i][j] = "";
  }
}

// Event handling
gameBoard.addEventListener("click", function (e) {
  if (!winningCondition) {
    if (e.target.textContent === "" && e.target.classList[0] === "cell") {
      console.log(e.target);
      const id = e.target.id;
      const parts = id.split("-");
      const row = parseInt(parts[1]);
      const col = parseInt(parts[2]);

      if (playerOne) {
        e.target.textContent = "X";

        e.target.classList.add("x-color");
        playerTurnEl.textContent = "O";
      } else {
        e.target.textContent = "O";
        e.target.classList.add("o-color");
        playerTurnEl.textContent = "X";
      }
      playerOne = !playerOne;
      console.log(playerOne);

      gameMatrix[row][col] = e.target.textContent;

      checkWinningCondition(row, col);
    }
  }
});

function isSame(s) {
  if (s.size === 1) {
    return true;
  }
  return false;
}

function checkWinningCondition(row, col) {
  let rowIndex = row;
  let colIndex = col;

  //   row Check
  const rowData = gameMatrix[rowIndex];
  let rowSimilarity = new Set(rowData);

  if (isSame(rowSimilarity)) {
    console.log("ROW WON");
    const winner = [...rowSimilarity][0];
    console.log(winner);
    winningCondition = true;
    playerTurnEl.textContent = "";
    resultEl.textContent = `${winner} WON`;
  }

  //   col Check
  const columnData = gameMatrix.map((row) => {
    return row[colIndex];
  });
  let colSimilarity = new Set(columnData);
  if (isSame(colSimilarity)) {
    console.log("COL WON");
    const winner = [...colSimilarity][0];
    console.log(winner);
    playerTurnEl.textContent = "";
    winningCondition = true;
    resultEl.textContent = `${winner} WON`;
  }

  //   Diagonal Check
  if (row === col || row + col === 2) {
    if (
      (gameMatrix[0][0] === gameMatrix[1][1] &&
        gameMatrix[1][1] === gameMatrix[2][2] &&
        gameMatrix[0][0] !== "") ||
      (gameMatrix[0][2] === gameMatrix[1][1] &&
        gameMatrix[1][1] === gameMatrix[2][0] &&
        gameMatrix[0][2] !== "")
    ) {
      console.log("DIAGONAL WON");
      playerTurnEl.textContent = "";
      winningCondition = true;
      resultEl.textContent = `${gameMatrix[1][1]} WON`;
    }
  }
}
