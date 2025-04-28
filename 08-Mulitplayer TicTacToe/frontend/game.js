const socket = io();

socket.on("connect", () => {
  console.log("User Connected with socket id : " + socket.id);
});

socket.on("gameFull", (message) => {
  document.body.innerHTML = message;
});
export class Game {
  constructor() {
    this.containerEl = document.getElementById("main-container");
    this.gameBoard = document.getElementById("main-gameboard");
    this.playerTurnEl = document.getElementById("player-turn");
    this.resultEl = document.getElementById("result");
    this.btnResetEl = document.getElementById("btn--reset");
    this.playerOne;
    this.winningCondition;
    this.gameMatrix;
    this.handleResetCondition = this.handleResetCondition.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.init();
  }
  init() {
    this.initialiseGameUI();

    socket.on("gameState", (gameState) => {
      this.playerOne = gameState.playerOneTurn;
      this.winningCondition = gameState.winner;
      this.gameMatrix = gameState.board;
      this.updateBoardUI();
      this.updateResultUI();
    });
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

  handleResetCondition() {
    socket.emit("reset game");
  }

  handleClick(e) {
    if (!this.winningCondition) {
      if (e.target.textContent === "" && e.target.classList.contains("cell")) {
        const id = e.target.id;
        const parts = id.split("-");
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        socket.emit("playerMove", row, col);
      }
      console.log(this.gameMatrix);
    }
  }
  updateBoardUI() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.getElementById(`cell-${i}-${j}`);
        cell.textContent = this.gameMatrix[i][j];

        // Remove old colors
        cell.classList.remove("x-color", "o-color");

        if (this.gameMatrix[i][j] === "X") {
          cell.classList.add("x-color");
        } else if (this.gameMatrix[i][j] === "O") {
          cell.classList.add("o-color");
        }
      }
    }
  }

  updateResultUI() {
    if (this.winningCondition) {
      if (this.winningCondition === "Draw") {
        this.resultEl.textContent = "DRAW";
        this.playerTurnEl.textContent = "";
      } else {
        this.resultEl.textContent = `${this.winningCondition} WON`;
        this.playerTurnEl.textContent = "";
      }
    } else {
      this.resultEl.textContent = "TURN";
      this.playerTurnEl.textContent = this.playerOne ? "X" : "O";
    }
  }
}

const game = new Game();
