const gameStartButtonElement = document.getElementById("game-start-button");
const boardElement = document.getElementById("board");
const gameSettion = document.getElementById("tic-tac-toe");

function gameStart(event) {
  let turn;
  let trial;
  let playerNames = [];
  let bGameOverFlag;
  const turnMessageSpanElement = document.getElementById("turn-message");

  function gameSettionInit() {
    gameSettion.style.visibility = "visible";
    const gameOverParagraphElement = document.getElementById("game-over");
    gameOverParagraphElement.style.display = "none";
    const player1NameElement = document.getElementById("player-1-name");
    const player2NameElement = document.getElementById("player-2-name");
    turn = 0;
    trial = 0;
    playerNames = [
      player1NameElement.textContent,
      player2NameElement.textContent,
    ];
    turnMessageSpanElement.textContent = playerNames[turn];
    bGameOverFlag = false;
  }
  function bingoCheck() {
    const cellElementList = boardElement.children;
    let markList = [];

    for (let i = 0; i < cellElementList.length; i++) {
      const cell = cellElementList[i];
      markList[i] = cell.textContent;
    }
    let horizontalBase = 0;
    let verticalBase = 0;
    let bBingoFlag = false;
    for (let i = 0; i < 3; i++) {
      bBingoFlag =
        bBingoFlag ||
        (markList[horizontalBase] != "" &&
          markList[horizontalBase] == markList[horizontalBase + 1] &&
          markList[horizontalBase + 1] == markList[horizontalBase + 2]);
      horizontalBase += 3;
      bBingoFlag =
        bBingoFlag ||
        (markList[verticalBase] != "" &&
          markList[verticalBase] == markList[verticalBase + 3] &&
          markList[verticalBase + 3] == markList[verticalBase + 6]);
      verticalBase += 1;
    }
    bBingoFlag ||=
      markList[0] != "" &&
      markList[0] == markList[4] &&
      markList[4] == markList[8];
    bBingoFlag ||=
      markList[2] != "" &&
      markList[2] == markList[4] &&
      markList[4] == markList[6];

    if (bBingoFlag) return "bingo";
    else if (trial == 9) return "draw";
    else return "continue";
    return bBingoFlag;
  }
  function gameOver(gameOverMessage) {
    const gameOverContainerElement = document.getElementById("game-over");
    const gameOverMessageParagraphElement =
      document.getElementById("game-over-message");
    gameOverContainerElement.style.display = "inline-block";
    gameOverMessageParagraphElement.textContent = gameOverMessage;
    bGameOverFlag = true;
  }
  function markFunction(event) {
    trial++;
    if (event.target.textContent != "" || bGameOverFlag) return;
    if (turn == 0) event.target.textContent = "X";
    else event.target.textContent = "O";
    if (trial >= 5) {
      const checkResult = bingoCheck();

      if (checkResult == "bingo")
        gameOver("You won, " + playerNames[turn] + "!");
      else if (checkResult == "draw") gameOver("DRAW!");
    }
    turn = (turn + 1) % 2;
    turnMessageSpanElement.textContent = playerNames[turn];
  }
  function addEventListenerToALLCells() {
    for (let cell of boardElement.children) {
      cell.textContent = "";
      cell.addEventListener("click", markFunction);
    }
  }
  gameSettionInit();
  addEventListenerToALLCells();
}
gameStartButtonElement.addEventListener("click", gameStart);
