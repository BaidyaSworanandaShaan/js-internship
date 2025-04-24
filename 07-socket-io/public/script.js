const btnChatEl = document.getElementById("btn-chat");
const usernameEl = document.getElementById("username");
const messageEl = document.getElementById("message");
const containerInitial = document.querySelector(".container--initial");
const containerMessageEl = document.querySelector(".container--message");
const form = document.getElementById("chat-form");
const chatListContainer = document.getElementById("chat-list");
const typingIndicator = document.getElementById("typingIndicator");
let username;
let typing = false;
let typingTimeout;
usernameEl.addEventListener("input", () => {
  username = usernameEl.value.trim();

  btnChatEl.disabled = username === "";
});
btnChatEl.addEventListener("click", () => {
  if (username) {
    enableMessageScreen();
    startSocketConfiguration();
  }
});

function enableMessageScreen() {
  containerInitial.style.display = "none";
  containerMessageEl.style.display = "flex";
  messageEl.focus();
}

function startSocketConfiguration() {
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server with ID: ", socket.id);
    socket.emit("set username", username);
  });

  socket.on("diconnect", () => {
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
