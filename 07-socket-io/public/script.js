const btnChatEl = document.getElementById("btn-chat");
const btnRoomIDEl = document.getElementById("btn-roomID");
const roomIDEl = document.getElementById("roomID");
const usernameEl = document.getElementById("username");
const joinGroupEl = document.getElementById("username");
const messageEl = document.getElementById("message");
const containerInitial = document.querySelector(".container--initial");
const containerMessageEl = document.querySelector(".container--message");
const containerRoomsEl = document.querySelector(".container--rooms");
const containerRoomJoinEl = document.querySelector(".container--room-join");
const form = document.getElementById("chat-form");
const chatListContainer = document.getElementById("chat-list");
const typingIndicator = document.getElementById("typingIndicator");
const roomIndicator = document.getElementById("roomIndicator");
let username;
let typing = false;
let typingTimeout;
let socket;
let roomID;
usernameEl.addEventListener("input", () => {
  username = usernameEl.value.trim();

  btnChatEl.disabled = username === "";
});
roomIDEl.addEventListener("input", () => {
  roomID = roomIDEl.value.trim();
  btnRoomIDEl.disabled = roomID === "";
});
btnChatEl.addEventListener("click", () => {
  if (username) {
    enableRoomScreen();
    // enableMessageScreen();
    startSocketConfiguration();
  }
});

function enableRoomScreen() {
  containerInitial.style.display = "none";
  containerRoomsEl.style.display = "flex";

  containerRoomsEl
    .querySelector(".room--create")
    .addEventListener("click", createRoom);

  containerRoomsEl
    .querySelector(".room--join")
    .addEventListener("click", enableJoinRoomScreen);
}
function enableJoinRoomScreen() {
  containerRoomsEl.style.display = "none";
  containerRoomJoinEl.style.display = "flex";

  btnRoomIDEl.addEventListener("click", joinRoom);
}
function joinRoom() {
  socket.emit("join room", roomID);

  socket.on("user joined", (joinedRoomId) => {
    roomIndicator.textContent =
      "You are now connected to room id : " + joinedRoomId;
    enableMessageScreen();
  });

  socket.on("room not found", () => {
    console.log("Room not Found");
  });
}

function createRoom() {
  socket.emit("create room");

  socket.on("room created", (newRoomId) => {
    alert(`Room created with ID: ${newRoomId}`);
    roomIndicator.textContent =
      "You are now connected to room id : " + newRoomId;
    enableMessageScreen();
  });
}
function enableMessageScreen() {
  containerRoomsEl.style.display = "none";
  containerRoomJoinEl.style.display = "none";
  containerMessageEl.style.display = "flex";
  messageEl.focus();
}

function startSocketConfiguration() {
  socket = io();

  socket.on("connect", () => {
    console.log("Connected to server with ID: ", socket.id);
    socket.emit("set username", username);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("chat message", (fullMessage, socketID) => {
    const li = document.createElement("li");
    li.textContent = fullMessage;
    if (socketID === socket.id) {
      li.classList.add("right-message");
    } else {
      li.classList.add("left-message");
    }
    chatListContainer.appendChild(li);
    console.log(socketID);
  });

  socket.on("typing", (name) => {
    typingIndicator.textContent = `${name} is typing`;
  });
  socket.on("stop typing", () => {
    typingIndicator.textContent = "";
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (messageEl.value) {
      console.log(messageEl.value);
      socket.emit("chat message", messageEl.value);
      messageEl.value = "";
    }
  });
  messageEl.addEventListener("input", () => {
    if (!typing) {
      typing = true;
      socket.emit("typing");
    }
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      typing = false;
      socket.emit("stop typing");
    }, 1000);
  });
}
