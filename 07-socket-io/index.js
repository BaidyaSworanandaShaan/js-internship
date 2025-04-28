const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

const users = new Map();
const rooms = new Set();
io.on("connect", (socket) => {
  socket.on("set username", (username) => {
    console.log("A user connected" + socket.id);
    users.set(socket.id, username);
    console.log(`Username set for ${socket.id}: ${username}`);
  });

  socket.on("create room", () => {
    const roomID = uuidv4();
    rooms.add(roomID);

    socket.join(roomID);
    socket.data.room = roomID;

    const name = users.get(socket.id);
    console.log(`${name} created and joined room: ${roomID}`);
    socket.emit("room created", roomID);
  });

  socket.on("join room", (roomID) => {
    if (rooms.has(roomID)) {
      socket.join(roomID);
      socket.data.room = roomID;

      const name = users.get(socket.id);
      console.log(`${name}joined room: ${roomID}`);
      socket.emit("user joined", roomID);
    } else {
      socket.emit("room not found", `Room "${roomID}" does not exist!`);
    }
  });

  socket.on("chat message", (msg) => {
    const name = users.get(socket.id);
    const fullMessage = `${name}: ${msg}`;
    console.log(fullMessage);
    const roomId = socket.data.room;
    if (roomId) {
      io.to(roomId).emit("chat message", fullMessage, socket.id);
    }
  });

  socket.on("typing", () => {
    const name = users.get(socket.id);
    const roomId = socket.data.room;
    socket.to(roomId).emit("typing", name);
  });
  socket.on("stop typing", () => {
    const name = users.get(socket.id);
    const roomId = socket.data.room;
    socket.to(roomId).emit("stop typing", name);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnect" + socket.id);
  });
});
const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
