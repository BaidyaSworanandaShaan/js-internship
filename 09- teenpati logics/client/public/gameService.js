const userInfoSection = document.querySelector(".user-info");
const userCardSection = document.querySelector(".user-cards");
const gameOptionsSection = document.querySelector(".game-options");

const placeBetBtn = document.getElementById("place-bet");
const seeCardsBtn = document.getElementById("see-cards");
const packCardsBtn = document.getElementById("pack-cards");
const showCardsBtn = document.getElementById("show-cards");

// Connect to the server
const socket = io();
userInfoSection.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const name = document.getElementById("name").value.trim();
  const balance = parseFloat(document.getElementById("balance").value);

  if (!name || isNaN(balance)) {
    alert("Please enter valid name and balance.");
    return;
  }

  socket.emit("addPlayers", { name, balance });
});
// When connected to the server
socket.on("connect", () => {
  console.log("User Connected with socket id: " + socket.id);
});
socket.on("totalPlayers", (playersData) => {
  console.log("Total Players: " + playersData.length);
});
socket.on("gameStateUpdated", (updatedGame) => {
  console.log("Game state updated:", updatedGame);

  renderUI(updatedGame);
});

socket.on("roomFull", () => {
  alert("Room is already full. You cannot join.");
});

socket.on("readyForRound", () => {
  console.log("Ready to start the round!");
  userInfoSection.style.display = "none";
  gameOptionsSection.style.display = "block";
  socket.emit("startRound");
});
socket.on("currentBetTurn", (currentPlayer) => {
  const log = document.getElementById("game-log");

  const p = document.createElement("p");
  p.textContent = `Game has started. Turn to Bet : ${currentPlayer.name}`;
  log.appendChild(p);
});
socket.on("notEnoughPlayers", () => {
  alert("At least 2 players are required to start the round.");
});
placeBetBtn.addEventListener("click", () => {
  socket.emit("placeBet", socket.id);
});
showCardsBtn.addEventListener("click", () => {
  socket.emit("showCards", socket.id);
});

socket.on("betPlaced", ({ message, currentPlayer }) => {
  displayMessage(message, currentPlayer);
});
socket.on("showCardMessage", ({ message, winner }) => {
  displayMessage(message, null, winner);
});
//Display PlaceBet Message
function displayMessage(msg, currentPlayer = null, winner = null) {
  const log = document.getElementById("game-log");

  const p = document.createElement("p");
  p.textContent = msg;
  log.appendChild(p);

  // If it's a regular turn update
  if (currentPlayer) {
    const span = document.createElement("span");
    span.textContent = `Turn To Bet : ${currentPlayer}`;
    log.appendChild(span);
  }

  // If there's a winner, display winner info
  if (winner) {
    const winnerDiv = document.createElement("div");
    winnerDiv.innerHTML = `
      <strong> Winner:</strong> ${winner.name}<br>
      <strong>Winning Hand:</strong> ${winner.hand
        .map((card) => `${card.rank} ${card.suit}`)
        .join(", ")}
    `;

    log.appendChild(winnerDiv);
  }
}

// Render UI
function renderUI(updatedGame) {
  const currentPlayer = updatedGame.players.find(
    (player) => player.id === socket.id
  );
  console.log(currentPlayer);
  if (currentPlayer) {
    userCardSection.innerHTML = `
      <div class="card">
        <h2>${currentPlayer.name}</h2>
        <p>Balance: ${currentPlayer.balance}</p>
      <div>
              ${currentPlayer.hand
                .map((card) => `${card.rank} ${card.suit}`)
                .join("<br>")}
      </div>
      </div>
    `;
  }
}
