const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const resultBox = document.getElementById("result"); // Winner display box

let currentPlayer = "❤️"; // Red heart starts
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const checkWinner = () => {  
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            resultBox.textContent = `${gameBoard[a]} Wins! 🎉`; // Show result in box
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
            return true;
        }
    }
    return false;
};

const handleClick = (event) => {
    let index = event.target.dataset.index;
    
    if (gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "❤️" ? "💙" : "❤️";
};

const resetGame = () => {
    gameBoard.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleClick);
    });
    currentPlayer = "❤️";
    resultBox.textContent = ""; // Clear result
};

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
