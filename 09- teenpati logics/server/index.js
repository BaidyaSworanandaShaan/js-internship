import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Game } from "./models/Game.js";
// import { playersData } from "./data/playerData.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("../client/public"));

const game = new Game();
const playersData = game.players;
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  if (playersData.length >= 2) {
    console.log("Room already has 2 players");
    socket.emit("roomFull");
    return;
  }

  socket.on("addPlayers", (newPlayerData) => {
    const { name, balance } = newPlayerData;

    if (!name || balance === undefined) {
      console.log("Invalid player information");
      return;
    }

    const newPlayer = {
      id: socket.id,
      name,
      balance,
    };

    game.addPlayers(newPlayer);
    console.log("Players added:");
    console.log(playersData);

    io.emit("totalPlayers", playersData);

    // Start the game automatically when 2 players have joined
    if (playersData.length === 2) {
      console.log("Two players joined, starting the game...");
      game.startGame();
      io.emit("readyForRound");
      io.emit("gameStateUpdated", game);
      io.emit("currentBetTurn", game.getCurrentPlayer());
    }
  });

  socket.on("placeBet", (id) => {
    const player = game.players.find((player) => player.id === id);
    if (!player) return;

    const result = game.placeBet(player, 10);
    const currentBetTurn = game.getCurrentPlayer();
    socket.emit("betPlaced", {
      message: result.message,
      playerId: player.id,
      currentPlayer: currentBetTurn.name,
    });

    if (result.success) {
      io.emit("gameStateUpdated", game);
      socket.broadcast.emit("betPlaced", {
        message: `${player.name} placed a bet of 10 coins.`,
        playerId: player.id,
        currentPlayer: currentBetTurn.name,
      });
    }
  });

  socket.on("showCards", (id) => {
    const player = game.players.find((player) => player.id === id);
    if (!player) return;
    const result = game.showCards(player);

    if (result.success) {
      io.emit("gameStateUpdated", game);
      io.emit("showCardMessage", {
        message: result.message,
        winner: result.winner,
      });
    } else {
      socket.emit("showCardMessage", {
        message: result.message,
      });
    }
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    removePlayerFromList(playersData, socket.id);
    removePlayerFromList(game.players, socket.id);
    console.log(game.players);
    io.emit("gameStateUpdated", game);
  });
});

function removePlayerFromList(list, socketId) {
  const index = list.findIndex((p) => p.id === socketId);
  if (index !== -1) {
    const [removed] = list.splice(index, 1);
    console.log(`Removed from list: ${removed.name}`);
  }
}

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
