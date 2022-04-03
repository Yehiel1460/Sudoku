const cell = document.getElementsByClassName("cell");
const divBoard = document.getElementsByClassName("board");
const timerResult = document.getElementById("stopwatch");
const chooseLvlScreen = document.getElementById("chooseBtnScreen");
const btnContainer = document.getElementById("btnContainer");
const gameScreenDiv = document.getElementById("gameScreen");
const boardBtn = document.getElementsByClassName("boardBtn");
const playerGameName = document.getElementById("boardPlayerName");
const playernameinp = document.getElementById("playername");
const ifPlayerNameInpEmpty = document.getElementById("InpEmptyMsg");

let hrs = 00;
let min = 00;
let sec = 00;
let intervalID;
let currentBoard;

// *** Checking if the username and password are currect ***
function login() {
  let flag = true;
  const password = document.getElementById("password");
  const userName = document.getElementById("username");
  const wrongPasswordMsg = document.getElementById("wrong--password");
  const wrongUserNameMsg = document.getElementById("wrong--username");
  let isPasswordWrong = password.value !== "1234";
  let isUsernameWrong = userName.value !== "abcd";
  if (isUsernameWrong) {
    wrongUserNameMsg.innerHTML = "Wrong username!";
    flag = false;
  } else {
    wrongUserNameMsg.innerHTML = "";
  }
  if (isPasswordWrong) {
    wrongPasswordMsg.innerHTML = "Wrong password!";
    flag = false;
  } else {
    wrongPasswordMsg.innerHTML = "";
  }
  if (flag == false) {
    return;
  }
  chooseLvlScreen.style.display = "flex";

  invisibleLogin();
  createCell();
}

// *** hidding the login screen ***
function invisibleLogin() {
  const loginDiv = document.getElementsByClassName("login");
  loginDiv[0].style.display = "none";
}

// *** pop alert if u click on forgot username or password ***
function forgotInp(val) {
  if (val == true) {
    alert("The Password is: 1234 :)");
  } else {
    alert("The User Name is: abcd :)");
  }
}

// *** Check if the player insert name then change the screen  ***
function requiredInp() {
  const playerNameInp = document.getElementById("playername").value;

  if (playerNameInp == "") {
    ifPlayerNameInpEmpty.style.display = "flex";
  } else {
    btnContainer.style.display = "none";
    chooseLvlScreen.style.display = "none";
    divBoard[0].style.display = "grid";
    timerResult.style.display = "flex";
    playerGameName.style.display = "flex";
    boardBtn[0].style.display = "flex";
    boardBtn[1].style.display = "flex";
    boardBtn[2].style.display = "flex";
    gameScreenDiv.style.display = "flex";
  }
}

// *** Create Board ***
function createCell() {
  let div;
  let currentCellData;
  for (let i = 0; i < 81; i++) {
    div = document.createElement("div");
    div.setAttribute("class", "cell");
    div.setAttribute("contenteditable", "false");
    divBoard[0].appendChild(div);
    div.addEventListener("input", function (e) {
      currentCellData = Number(e.target.innerHTML);
      if (
        currentCellData > 9 ||
        currentCellData < 1 ||
        e.target.innerHTML > "9" ||
        e.target.innerHTML < "1"
      ) {
        e.target.innerHTML = "";
        e.target.style.backgroundColor = "red";
        e.target.style.color = "white";
      } else {
        e.target.style.backgroundColor = "white";
        e.target.style.color = "black";
      }
      if (e.target.innerHTML == "") {
        e.target.style.backgroundColor = "white";
        e.target.style.color = "black";
      }
    });
  }
}

// *** Choosing random board ***
function randomBoard() {
  const board1 = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  const board2 = [
    [7, 2, 6, 3, 5, 9, 4, 1, 8],
    [4, 5, 8, 1, 6, 7, 2, 3, 9],
    [9, 1, 3, 8, 2, 4, 7, 6, 5],
    [1, 6, 2, 9, 7, 5, 3, 8, 4],
    [3, 9, 4, 2, 8, 6, 1, 5, 7],
    [8, 7, 5, 4, 1, 3, 9, 2, 6],
    [5, 3, 7, 6, 4, 1, 8, 9, 2],
    [6, 8, 9, 7, 3, 2, 5, 4, 1],
    [2, 4, 1, 5, 9, 8, 6, 7, 3],
  ];

  const board3 = [
    [2, 8, 3, 7, 9, 5, 4, 1, 6],
    [6, 9, 1, 8, 4, 2, 5, 3, 7],
    [4, 7, 5, 6, 3, 1, 2, 9, 8],
    [7, 5, 6, 9, 8, 4, 3, 2, 1],
    [1, 3, 9, 5, 2, 6, 7, 8, 4],
    [8, 2, 4, 1, 7, 3, 6, 5, 9],
    [9, 4, 2, 3, 6, 8, 1, 7, 5],
    [5, 6, 7, 2, 1, 9, 8, 4, 3],
    [3, 1, 8, 4, 5, 7, 9, 6, 2],
  ];

  let specificBoard = Math.floor(Math.random() * (4 - 1)) + 1;
  if (specificBoard == 1) {
    return board1;
  }
  if (specificBoard == 2) {
    return board2;
  }
  if (specificBoard == 3) {
    return board3;
  }
}

// *** Convert numbers to zero by the diffcult and hide them ***
function hideNumbers(board, diffcultNum) {
  currentBoard = Array.from(board.map((r) => Array.from(r)));
  let difficultyChosen = 0;

  if (diffcultNum == "easy") {
    difficultyChosen = 25;
  } else if (diffcultNum == "medium") {
    difficultyChosen = 50;
  } else if (diffcultNum == "hard") {
    difficultyChosen = 75;
  }

  for (let i = 0; i < (81 * difficultyChosen) / 100; i++) {
    let randomRow = Math.floor(Math.random() * 9);
    let randomCol = Math.floor(Math.random() * 9);
    if (board[randomRow][randomCol] === 0) {
      i--;
      continue;
    } else {
      board[randomRow][randomCol] = 0;
    }
  }

  return board;
}

//*** Display board with hidden numbers ***
let currentBoardWithHidenNumbers;
function fillBoard(readyBoard) {
  requiredInp();
  playerName();
  clearInterval(intervalID);

  intervalID = setInterval(timerCycle, 1000);

  for (let i = 0; i < readyBoard.length; i++) {
    for (let j = 0; j < readyBoard[i].length; j++) {
      if (readyBoard[i][j] !== null) {
        cell[i * 9 + j].innerHTML = readyBoard[i][j];
       
        // cell[i * 9 + j].style.backgroundColor ='black'
        
      }
      if (readyBoard[i][j] == 0) {
        cell[i * 9 + j].setAttribute("contenteditable", "true")
        cell[i * 9 + j].innerHTML = readyBoard[i][j] = "";
      }
    }
  }
  return (currentBoardWithHidenNumbers = readyBoard);
}

// *** Timer calculation ***
function timerCycle() {
  sec++;

  if (sec == 60) {
    min++;
    sec = 0;
  }
  if (min == 60) {
    hrs++;
    min = 0;
  }

  timerResult.innerHTML =
    returnNumberWithZero(hrs) +
    ":" +
    returnNumberWithZero(min) +
    ":" +
    returnNumberWithZero(sec);
}

// *** add 0 to the timer ***
function returnNumberWithZero(num) {
  if (num <= 9) {
    num = "0" + num;
  }
  return num;
}

// *** take u back to the choosing lvl screen ***
function BackToLevelScreen(board) {
  checkBoard = isBoardCorrect(board);
  if (checkBoard.isBoardCorrect) {
    cell[checkBoard.wrongCellswrongCellsIndex[i]].style.backgroundColor =
      "white";
    cell[checkBoard.wrongCellswrongCellsIndex[i]].style.color = "black";
  } else {
    for (let i = 0; i < checkBoard.wrongCellswrongCellsIndex.length; i++) {
      cell[checkBoard.wrongCellswrongCellsIndex[i]].style.backgroundColor =
        "white";
      cell[checkBoard.wrongCellswrongCellsIndex[i]].style.color = "black";
    }
  }

  btnContainer.style.display = "flex";
  chooseLvlScreen.style.display = "flex";
  gameScreenDiv.style.display = "none";
  ifPlayerNameInpEmpty.style.display = "none";

  sec = 0;
  min = 0;
  hrs = 0;
  timerResult.innerHTML = "00:00:00";
  clearInterval(intervalID);
  return;
}

// *** Restore the board before the changes ***
function restartLvl(currentBoard) {
  clearInterval(intervalID);
  intervalID = setInterval(timerCycle, 1000);
  sec = 0;
  min = 0;
  hrs = 0;
  timerResult.innerHTML = "00:00:00";

  for (let i = 0; i < currentBoard.length; i++) {
    for (let j = 0; j < currentBoard[i].length; j++) {
      cell[i * 9 + j].innerHTML = currentBoard[i][j];
      cell[i * 9 + j].style.backgroundColor = "white";
      cell[i * 9 + j].style.color = "black";
    }
  }
}

// *** Checking if the numbers are currect ***
let checkBoard;
function finishBtnBoard() {
  board = currentBoard;
  checkBoard = isBoardCorrect(board);
  if (checkBoard.isBoardCorrect) {
    for (let j = 0; j < cell.length; j++) {
      cell[j].style.backgroundColor = "#00ff15";
      cell[j].style.color = "black";
      cell[j].style.borderColor = "black";
    }
    playerGameName.innerHTML = "Good Job: " + playernameinp.value;
    alert("good job " + playernameinp.value);

    clearInterval(intervalID);
  } else {
    alert(
      "Oops " +
        playernameinp.value +
        " looks like u failed, the timer still runing, hurry up! finish the board."
    );
    for (let i = 0; i < checkBoard.wrongCellswrongCellsIndex.length; i++) {
      cell[checkBoard.wrongCellswrongCellsIndex[i]].style.backgroundColor =
        "red";
      cell[checkBoard.wrongCellswrongCellsIndex[i]].style.color = "white";
    }
  }
}

function isBoardCorrect(board) {
  let isBoardCorrect = true;
  let wrongCellswrongCellsIndex = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] != cell[i * 9 + j].innerHTML) {
        isBoardCorrect = false;
        wrongCellswrongCellsIndex.push(i * 9 + j);
      }
    }
  }
  return {
    isBoardCorrect,
    wrongCellswrongCellsIndex,
  };
}

function playerName() {
  playerGameName.innerHTML = "Good Luck: " + playernameinp.value;
}
