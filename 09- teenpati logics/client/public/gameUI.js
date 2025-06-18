import {
  splashContinueBtn,
  splashScreen,
  playerUserNameScreen,
  usernameInput,
  usernameEl,
  btnUsernameProceed,
  lobbySelectionScreen,
  roomIdInputEl,
  btnJoinRoom,
  startGameBtn,
  showLoginBtn,
  showSignUpBtn,
  loginSection,
  signUpSection,
} from "./domSelectors.js";
import {
  renderMainGameScreen,
  startSocketConfiguration,
} from "./gameService.js";

// Variable
let username = "";
let roomId = "";

// Events
splashContinueBtn.addEventListener("click", () => {
  splashScreen.style.display = "none";
  playerUserNameScreen.style.display = "block";
});
// usernameInput.addEventListener("input", () => {
//   username = usernameInput.value.trim();
//   btnUsernameProceed.disabled = username === "";
// });
// btnUsernameProceed.addEventListener("click", () => {
//   usernameEl.textContent = username;
//   playerUserNameScreen.style.display = "none";
//   lobbySelectionScreen.style.display = "flex";
//   startSocketConfiguration(username);
// });

roomIdInputEl.addEventListener("input", () => {
  roomId = roomIdInputEl.value.trim();
  btnJoinRoom.disabled = roomId === "";
});
startGameBtn.addEventListener("click", () => {
  renderMainGameScreen();
});
showLoginBtn.addEventListener("click", () => {
  console.log("Show Login");
  showLoginBtn.classList.add("btn-active");
  showSignUpBtn.classList.remove("btn-active");
  loginSection.style.display = "flex";
  signUpSection.style.display = "none";
});

showSignUpBtn.addEventListener("click", () => {
  console.log("Show Signup");
  showSignUpBtn.classList.add("btn-active");
  showLoginBtn.classList.remove("btn-active");
  loginSection.style.display = "none";
  signUpSection.style.display = "flex";
});
