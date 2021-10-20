const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let winningMessageTextElement = document.querySelector('[data-winning-message-text');
let circleTurn = false;
let winCombination = [6, 4, 2];
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]


startGame();

restartButton.addEventListener('click', startGame);

/**
 * - it start the needed functions for init the game.
 */
function startGame() {
    //Frage stellen bei Live-call bezüglich addeventlistener bubbling capturing
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true }) // Hier frgae bezüglich {once: true }???;
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

/**
 * 
 * @param {event} e the event-Object which include all information sabout window-interaction.
 * this is a callback function from the addeventlistener inside the startGame which start the Game by click from player.
 */
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // Frage zur Funktionsweise?
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    //Check For Win
    //Check For Draw
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Game Over!';
    } else {
        renderWinnerLine(indexOfFullRow());
        winningMessageTextElement.innerText = `${circleTurn ? "O's" :
            "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS);
    });
}

/**
 * 
 * @param {event} cell = the actually clicked cell inside the board, was located with click event.
 * @param {string} currentClass - The current class, which is its turn ('x' or 'circle')
 */
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

/**
 * it switch the currentclass which define the current player ('x' or 'circle')
 */
function swapTurns() {
    circleTurn = !circleTurn;
}

/**
 *  This function remove at first time all playing-classes from the board. 
 *  Afterward add the current class to board classList.
 */
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
};

/**
 * 
 * @param {string} currentClass - The current class, which is its turn ('x' or 'circle')
 * @returns the class with the correct combination for the win.
 */
function checkWin(currentClass) {
    //.some() method returns true if one element pass the test.
    return WINNING_COMBINATIONS.some(combination => {
        //winCombination = combination;
        //.every() method return true only if all elements in an array pass a test.
        return combination.every(index => {
           
            return cellElements[index].classList.contains(currentClass);
        })
        
    })
};

function checkWinLine(winCombination){
    return winCombination;
};

function indexOfFullRow(){
    return WINNING_COMBINATIONS.findIndex(checkWinLine);
};
    
 
function renderWinnerLine(index) {
    console.log(index);
};