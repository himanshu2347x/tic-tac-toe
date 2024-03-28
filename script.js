const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".button");
let currentPlayer;
let gameGrid;
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initGame();

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
      box.classList.remove("win");
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
  });
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let winner = "";
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      winner = gameGrid[position[0]] === "X" ? "X" : "O";

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (winner !== "") {
    gameInfo.textContent = `Winner is - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

  // Here is not winner yet Check for tie
  let fillCount = 0;
  gameGrid.forEach((element) => {
    if (element !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.textContent = "Game Tied!";
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
