import express from "express";
import http from "http";
import { Server } from "socket.io";

import { Game } from "./models/Game.js";
// import { playersData } from "./data/playerData.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("../client/public"));
const rooms = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);

    if (!rooms[roomName]) {
      rooms[roomName] = new Game();
    }
    const game = rooms[roomName];
    const playersData = game.players;

    if (playersData.length >= 3) {
      console.log("Room already has 3 players");
      socket.emit("roomFull");
      return;
    }

    socket.on("addPlayers", (newPlayerData) => {
      const { name, balance } = newPlayerData;

      if (!name || balance === undefined) {
        console.log("Invalid player information");
        return;
      }
      const alreadyExists = game.players.some(
        (player) => player.id === socket.id
      );
      if (alreadyExists) {
        console.log(`Player with ID ${socket.id} already exists.`);
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

      socket.emit("totalPlayers", playersData);

      // Start the game automatically when 3 players have joined
      if (playersData.length === 3) {
        console.log("Two players joined, starting the game...");
        game.startGame();
        io.to(roomName).emit("readyForRound");
        io.to(roomName).emit("gameStateUpdated", game);
        io.to(roomName).emit("currentBetTurn", game.getCurrentPlayer());
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
        io.to(roomName).emit("gameStateUpdated", game);
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
        io.to(roomName).emit("gameStateUpdated", game);
        io.to(roomName).emit("showCardMessage", {
          message: result.message,
          winner: result.winner,
        });
      } else {
        socket.emit("showCardMessage", {
          message: result.message,
        });
      }
    });

    socket.on("packCards", (id) => {
      const player = game.players.find((player) => player.id === id);
      if (!player) return;

      const result = game.foldPlayer(player);

      if (result.winner && result.success) {
        io.to(roomName).emit("gameStateUpdated", game);
        io.to(roomName).emit("showCardMessage", {
          message: result.message,
          winner: result.winner,
        });
      } else if (result.success) {
        io.to(roomName).emit("gameStateUpdated", game);

        io.to(roomName).emit("betPlaced", {
          message: result.message,
          playerId: player.id,
          currentPlayer: game.getCurrentPlayer().name,
        });
      } else {
        socket.emit("betPlaced", {
          message: result.message,
          playerId: player.id,
          currentPlayer: game.getCurrentPlayer().name,
        });
      }
    });

    socket.on("restartGame", () => {
      setTimeout(() => {
        game.restartGame();
        io.to(roomName).emit("readyForRound");
        io.to(roomName).emit("gameStateUpdated", game);
        io.to(roomName).emit("currentBetTurn", game.getCurrentPlayer());
      }, 5000);
    });

    socket.on("disconnect", () => {
      // const alreadyExists = game.players.some(
      //   (player) => player.id === socket.id
      // );
      console.log(`User disconnected: ${socket.id}`);
      removePlayerFromList(game.players, socket.id);
      console.log(game.players);
      io.to(roomName).emit("gameStateUpdated", game);

      // if (alreadyExists) {
      //   console.log("Restarting game due to player disconnection...");
      //   io.to(roomName).emit("playerDisconnect");
      //   setTimeout(() => {
      //     game.restartGame();
      //     io.to(roomName).emit("gameStateUpdated", game);
      //     io.to(roomName).emit("readyForRound");
      //     io.to(roomName).emit("currentBetTurn", game.getCurrentPlayer());
      //   }, 2000);
      // }
    });
  });

  function removePlayerFromList(list, socketId) {
    const index = list.findIndex((p) => p.id === socketId);
    if (index !== -1) {
      const [removed] = list.splice(index, 1);
      console.log(`Removed from list: ${removed.name}`);
    }
  }
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
