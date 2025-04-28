class Game {
  constructor() {
    this.containerEl = document.getElementById("main-container");
    this.gameBoard = document.getElementById("main-gameboard");
    this.playerTurnEl = document.getElementById("player-turn");
    this.resultEl = document.getElementById("result");
    this.btnResetEl = document.getElementById("btn--reset");
    this.playerOne = true;
    this.winningCondition = false;
    this.gameMatrix = [];

    this.handleResetCondition = this.handleResetCondition.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.init();
  }
  init() {
    this.initialiseGameUI();
    this.initialiseGameMatrix();
    this.btnResetEl.addEventListener("click", this.handleResetCondition);
    this.gameBoard.addEventListener("click", this.handleClick);
  }

  initialiseGameUI() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.id = `cell-${i}-${j}`;
        cell.classList.add("cell");
        cell.textContent = "";
        this.gameBoard.appendChild(cell);
      }
    }
  }
  initialiseGameMatrix() {
    this.gameMatrix = [];
    for (let i = 0; i < 3; i++) {
      this.gameMatrix[i] = [];
      for (let j = 0; j < 3; j++) {
        this.gameMatrix[i][j] = "";
      }
    }
  }
  handleResetCondition() {
    this.gameBoard.childNodes.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("o-color");
      cell.classList.remove("x-color");
      console.log(cell);
    });
    this.playerOne = true;
    this.winningCondition = false;
    this.resultEl.textContent = "TURN";
    this.playerTurnEl.textContent = "X";

    this.initialiseGameMatrix();
  }

  handleClick(e) {
    console.log(this.gameMatrix);
    if (!this.winningCondition) {
      if (e.target.textContent === "" && e.target.classList.contains("cell")) {
        const id = e.target.id;
        const parts = id.split("-");
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);

        if (this.playerOne) {
          e.target.textContent = "X";
          e.target.classList.add("x-color");
          this.playerTurnEl.textContent = "O";
        } else {
          e.target.textContent = "O";
          e.target.classList.add("o-color");
          this.playerTurnEl.textContent = "X";
        }
        this.playerOne = !this.playerOne;

        this.gameMatrix[row][col] = e.target.textContent;

        this.checkWinningCondition(row, col);
        this.drawConditionCheck();
      }
    }
  }

  isSame(s) {
    if (s.size === 1) {
      return true;
    }
    return false;
  }

  rowConditionCheck(rowIndex, colIndex) {
    const rowData = this.gameMatrix[rowIndex];
    let rowSimilarity = new Set(rowData);

    if (this.isSame(rowSimilarity)) {
      console.log("ROW WON");
      const winner = [...rowSimilarity][0];
      this.winnerDisplay(winner);
    }
  }

  columnConditionCheck(rowIndex, colIndex) {
    const columnData = this.gameMatrix.map((row) => {
      return row[colIndex];
    });
    let colSimilarity = new Set(columnData);
    if (this.isSame(colSimilarity)) {
      const winner = [...colSimilarity][0];
      this.winnerDisplay(winner);
    }
  }

  diagonalConditionCheck(rowIndex, colIndex) {
    if (rowIndex === colIndex || rowIndex + colIndex === 2) {
      if (
        (this.gameMatrix[0][0] === this.gameMatrix[1][1] &&
          this.gameMatrix[1][1] === this.gameMatrix[2][2] &&
          this.gameMatrix[0][0] !== "") ||
        (this.gameMatrix[0][2] === this.gameMatrix[1][1] &&
          this.gameMatrix[1][1] === this.gameMatrix[2][0] &&
          this.gameMatrix[0][2] !== "")
      ) {
        console.log("DIAGONAL WON");
        const winner = this.gameMatrix[1][1];
        this.winnerDisplay(winner);
      }
    }
  }
  drawConditionCheck() {
    const isDraw = this.gameMatrix.every((row) =>
      row.every((cell) => cell !== "")
    );
    if (isDraw) {
      this.winningCondition = true;
      this.playerTurnEl.textContent = "";
      this.resultEl.textContent = `DRAW`;
    }
  }
  winnerDisplay(winner) {
    this.winningCondition = true;
    this.playerTurnEl.textContent = "";
    this.resultEl.textContent = `${winner} WON`;
  }
  checkWinningCondition(row, col) {
    this.rowConditionCheck(row, col);
    this.columnConditionCheck(row, col);
    this.diagonalConditionCheck(row, col);
  }
}

const game = new Game();
