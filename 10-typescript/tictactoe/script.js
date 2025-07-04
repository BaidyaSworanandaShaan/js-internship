var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var containerEl = document.getElementById("main-container");
var gameBoard = document.getElementById("main-gameboard");
var playerTurnEl = document.getElementById("player-turn");
var resultEl = document.getElementById("result");
var btnResetEl = document.getElementById("btn--reset");
var playerOne = true;
var winningCondition = false;
// Create UI ELEMENTS
// RESET CONDITION
btnResetEl.addEventListener("click", function () {
    gameBoard.childNodes.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("o-color");
        cell.classList.remove("x-color");
        console.log(cell);
    });
    playerOne = true;
    winningCondition = false;
    resultEl.textContent = "TURN";
    playerTurnEl.textContent = "X";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            gameMatrix[i][j] = "";
        }
    }
    console.log(gameMatrix);
});
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement("div");
        cell.id = "cell-".concat(i, "-").concat(j);
        cell.classList.add("cell");
        cell.textContent = "";
        gameBoard.appendChild(cell);
    }
}
// Matrix for Tic Tac Toe
var gameMatrix = new Array();
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        gameMatrix[i] = [];
    }
}
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        var selectedCell = document.getElementById("cell-".concat(i, "-").concat(j));
        gameMatrix[i][j] = "";
    }
}
// Event handling
gameBoard.addEventListener("click", function (e) {
    if (!winningCondition) {
        if (e.target.textContent === "" && e.target.classList[0] === "cell") {
            console.log(e.target);
            var id = e.target.id;
            var parts = id.split("-");
            var row = parseInt(parts[1]);
            var col = parseInt(parts[2]);
            if (playerOne) {
                e.target.textContent = "X";
                e.target.classList.add("x-color");
                playerTurnEl.textContent = "O";
            }
            else {
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
    var rowIndex = row;
    var colIndex = col;
    //   row Check
    var rowData = gameMatrix[rowIndex];
    var rowSimilarity = new Set(rowData);
    if (isSame(rowSimilarity)) {
        console.log("ROW WON");
        var winner = __spreadArray([], rowSimilarity, true)[0];
        console.log(winner);
        winningCondition = true;
        playerTurnEl.textContent = "";
        resultEl.textContent = "".concat(winner, " WON");
    }
    //   col Check
    var columnData = gameMatrix.map(function (row) {
        return row[colIndex];
    });
    var colSimilarity = new Set(columnData);
    if (isSame(colSimilarity)) {
        console.log("COL WON");
        var winner = __spreadArray([], colSimilarity, true)[0];
        console.log(winner);
        playerTurnEl.textContent = "";
        winningCondition = true;
        resultEl.textContent = "".concat(winner, " WON");
    }
    //   Diagonal Check
    if (row === col || row + col === 2) {
        if ((gameMatrix[0][0] === gameMatrix[1][1] &&
            gameMatrix[1][1] === gameMatrix[2][2] &&
            gameMatrix[0][0] !== "") ||
            (gameMatrix[0][2] === gameMatrix[1][1] &&
                gameMatrix[1][1] === gameMatrix[2][0] &&
                gameMatrix[0][2] !== "")) {
            console.log("DIAGONAL WON");
            playerTurnEl.textContent = "";
            winningCondition = true;
            resultEl.textContent = "".concat(gameMatrix[1][1], " WON");
        }
    }
}
