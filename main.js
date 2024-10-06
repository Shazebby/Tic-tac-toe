/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn;
let win;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board .square'));
const messages = document.querySelector('h2');
const resetButton = document.getElementById('reset-button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
resetButton.addEventListener('click', init);

/*----- functions -----*/
function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    turn = 'X';
    win = null;
    render();
}

function handleTurn(event) {
    // Ensure the clicked element is a square
    if (!event.target.classList.contains('square')) return;

    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });

    console.log(`Square clicked: Index ${idx}, Current Board:`, board);

    // Prevent changing a square that has already been clicked or if there's a winner
    if (board[idx] !== '' || win) {
        console.log('Invalid move.');
        return;
    }

    board[idx] = turn;
    console.log(`Placing ${turn} at index ${idx}`);
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
}

function render() {
    board.forEach(function(val, idx) {
        squares[idx].textContent = val;
    });
    if (win === 'T') {
        messages.textContent = `That's a tie, queen!`;
    } else if (win) {
        messages.textContent = `${win} wins the game!`;
    } else {
        messages.textContent = `It's ${turn}'s turn!`;
    }
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    // Check for tie
    if (!winner && !board.includes('')) {
        return 'T';
    }
    return winner;
}

// Initialize the game
init();
