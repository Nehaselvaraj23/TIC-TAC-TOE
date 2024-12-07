// script.js
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const statusText = document.getElementById("status");
  const resetBtn = document.getElementById("reset-btn");
  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");

  let currentPlayer = "X";
  let gameActive = true;
  let boardState = ["", "", "", "", "", "", "", "", ""];

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Initialize the board
  function initializeBoard() {
    board.innerHTML = ""; // Clear previous board
    boardState = ["", "", "", "", "", "", "", "", ""]; // Reset state
    gameActive = true; // Allow new moves
    currentPlayer = "X"; // Reset to Player X
    statusText.textContent = "Player X's turn";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }

  // Handle a cell click
  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!gameActive || boardState[index]) return; // Prevent invalid moves

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      updateScore(currentPlayer);
      gameActive = false;
    } else if (boardState.every(cell => cell)) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  // Check for a winning pattern
  function checkWin() {
    return winningPatterns.some(pattern =>
      pattern.every(index => boardState[index] === currentPlayer)
    );
  }

  // Update the score
  function updateScore(player) {
    if (player === "X") {
      scoreX.textContent = parseInt(scoreX.textContent) + 1;
    } else {
      scoreO.textContent = parseInt(scoreO.textContent) + 1;
    }
  }

  // Reset the game
  resetBtn.addEventListener("click", initializeBoard);

  // Initialize the game when the page loads
  initializeBoard();
});
