const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

const users = new Map();
io.on("connect", (socket) => {
  socket.on("set username", (username) => {
    console.log("A user connected" + socket.id);
    users.set(socket.id, username);
    console.log(`Username set for ${socket.id}: ${username}`);
  });

  socket.on("chat message", (msg) => {
    const name = users.get(socket.id);
    const fullMessage = `${name}: ${msg}`;
    console.log(fullMessage);

    io.emit("chat message", fullMessage, socket.id);
  });

  socket.on("typing", () => {
    const name = users.get(socket.id);
    socket.broadcast.emit("typing", name);
  });
  socket.on("stop typing", () => {
    const name = users.get(socket.id);
    socket.broadcast.emit("stop typing", name);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnect" + socket.id);
  });
});
const PORT = 8000;

server.listen(PORT, () => {
  console.log("Server running on PORT: " + PORT);
});
