const editButtonElementList = document.querySelectorAll(".edit-button");
const editCloseButtonElement = document.getElementById("cancel-button");
const editConfirmButtonElement = document.getElementById("confirm-button");

let currentProccessingPlayerNumber = 0;

function openEditWindowOverlay(event) {
  const userNameInputElement = document.getElementById("player-name-input");
  userNameInputElement.value = "";
  currentProccessingPlayerNumber = event.target.parentNode.id[7];
  const editWindow = document.getElementById("edit-window-overlay");
  editWindow.classList.add("is-open");

  setTimeout(function () {
    userNameInputElement.focus();
  }, 300);
  userNameInputElement.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      // Enter key pressed
      // Execute your desired event here
      console.log("Enter key pressed. Executing desired event.");
      // For example, you can call a function to process the input value
      confirmEdit(userNameInputElement.value);
    }
  });
}

function closeWindow() {
  const editWindow = document.getElementById("edit-window-overlay");
  const userInputOfNameInputElement =
    document.getElementById("player-name-input");
  const warningTextElement = document.getElementById("warning-text");
  warningTextElement.textContent = "";
  userInputOfNameInputElement.classList.remove("input-warning");
  editWindow.classList.remove("is-open");
}
function closeEditWindowOverlay(event) {
  closeWindow();
}
function confirmEdit(event) {
  const playerID = "player-" + currentProccessingPlayerNumber;
  const playerNameText = playerID + "-name";
  const playerNameElement = document.getElementById(playerNameText);
  const userInputOfNameInputElement =
    document.getElementById("player-name-input");

  if (!userInputOfNameInputElement.value) {
    const warningTextElement = document.getElementById("warning-text");
    const playerNameInputLabelElement = document.getElementById(
      "player-name-input-label"
    );
    playerNameInputLabelElement.classList.add("warning-label");
    userInputOfNameInputElement.classList.add("input-warning");
    warningTextElement.textContent = "Please enter a valid name!";
  } else {
    playerNameElement.textContent = userInputOfNameInputElement.value;
    closeWindow();
  }
}

for (let editButton of editButtonElementList) {
  editButton.addEventListener("click", openEditWindowOverlay);
}

editCloseButtonElement.addEventListener("click", closeEditWindowOverlay);
editConfirmButtonElement.addEventListener("click", confirmEdit);
