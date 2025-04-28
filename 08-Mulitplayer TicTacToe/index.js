const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("frontend"));

const maxPlayers = 2;
let players = {};
const gameState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  playerOneTurn: true,
  winner: false,
  moves: 0,
};

function isSame(s) {
  if (s.size === 1) {
    return true;
  }
  return false;
}

function checkWinningCondition(board, row, col) {
  const playerSymbol = board[row][col];

  // Row check
  const rowData = board[row];
  const rowSimilarity = new Set(rowData);
  if (isSame(rowSimilarity) && !rowSimilarity.has("")) {
    return playerSymbol;
  }

  // Column check
  const columnData = board.map((r) => r[col]);
  const colSimilarity = new Set(columnData);
  if (isSame(colSimilarity) && !colSimilarity.has("")) {
    return playerSymbol;
  }

  // Diagonal checks
  if (row === col) {
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      return playerSymbol;
    }
  }
  if (row + col === 2) {
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      return playerSymbol;
    }
  }

  return null; // No winner
}

function resetGame() {
  gameState.board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameState.playerOneTurn = true;
  gameState.winner = null;
  gameState.moves = 0;
}

io.on("connect", (socket) => {
  let playerId = players.player1 ? "player2" : "player1";
  players[playerId] = socket.id;

  console.log(players);
  if (io.engine.clientsCount > maxPlayers) {
    socket.emit("gameFull", "The game is full. Please try again later.");
    socket.disconnect();
    console.log(
      "Player " + socket.id + " disconnected due to game being full."
    );
    return;
  }
  console.log("User Connected" + socket.id);
  socket.emit("gameState", gameState);

  socket.on("playerMove", (row, col) => {
    console.log(row, col);
    if (gameState.winner) return;
    if (gameState.board[row][col] !== "") return;

    if (gameState.playerOneTurn && socket.id !== players.player1) return;
    if (!gameState.playerOneTurn && socket.id !== players.player2) return;
    // Update board
    const symbol = gameState.playerOneTurn ? "X" : "O";
    gameState.board[row][col] = symbol;
    gameState.moves++;

    // Check winner
    const winner = checkWinningCondition(gameState.board, row, col);
    if (winner) {
      gameState.winner = winner;
    } else if (gameState.moves === 9) {
      gameState.winner = "Draw";
    } else {
      gameState.playerOneTurn = !gameState.playerOneTurn; // Switch turn
    }

    io.emit("gameState", gameState);
  });

  socket.on("reset game", () => {
    resetGame();
    io.emit("gameState", gameState);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    playerCount--;
    for (const key in players) {
      if (players[key] === socket.id) {
        delete players[key];
      }
    }
    resetGame();
    io.emit("gameState", gameState);
  });
});
const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
