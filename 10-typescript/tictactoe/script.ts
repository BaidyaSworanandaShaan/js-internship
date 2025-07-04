const containerEl = document.getElementById("main-container") as HTMLElement;
const gameBoard = document.getElementById("main-gameboard") as HTMLElement;
const playerTurnEl = document.getElementById("player-turn") as HTMLElement;
const resultEl = document.getElementById("result") as HTMLElement;
const btnResetEl = document.getElementById("btn--reset") as HTMLButtonElement;

let playerOne: boolean = true;
let winningCondition: boolean = false;

// Matrix for Tic Tac Toe

type Player = "X" | "O";
type CellValue = Player | "";

const gameMatrix: CellValue[][] = [];

for (let i = 0; i < 3; i++) {
  gameMatrix[i] = [];
  for (let j = 0; j < 3; j++) {
    gameMatrix[i][j] = "";
  }
}

// Create UI ELEMENTS

// RESET CONDITION
btnResetEl.addEventListener("click", function () {
  gameBoard.childNodes.forEach((cell) => {
    const element = cell as HTMLElement;
    element.textContent = "";
    element.classList.remove("o-color");
    element.classList.remove("x-color");
    console.log(element);
  });
  playerOne = true;
  winningCondition = false;
  resultEl.textContent = "TURN";
  playerTurnEl.textContent = "X";

  for (let i = 0; i < 3; i++) {
    gameMatrix[i] = [];
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
gameBoard.addEventListener("click", function (e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!winningCondition) {
    if (target.textContent === "" && target.classList[0] === "cell") {
      console.log(target);
      const id = target.id;
      const parts = id.split("-");
      const row = parseInt(parts[1]);
      const col = parseInt(parts[2]);

      if (playerOne) {
        target.textContent = "X";

        target.classList.add("x-color");
        playerTurnEl.textContent = "O";
      } else {
        target.textContent = "O";
        target.classList.add("o-color");
        playerTurnEl.textContent = "X";
      }
      playerOne = !playerOne;
      console.log(playerOne);

      gameMatrix[row][col] = target.textContent as CellValue;

      checkWinningCondition(row, col);
    }
  }
});

function isSame(s: Set<string>): boolean {
  if (s.size === 1) {
    return true;
  }
  return false;
}

function checkWinningCondition(row: number, col: number): void {
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
