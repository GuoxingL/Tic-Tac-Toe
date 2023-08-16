 /*----- constants -----*/
const COLORS = {
  'null': 'white',
  '1': 'purple',
  '-1': 'orange'
};

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
//learn that from Google
/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {
  const idx = parseInt(evt.target.id.replace('sq', ''));

  if (isNaN(idx) || board[idx] !== null || winner) return;
  
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  
  if (board.includes(null)) return null;
  return 'T';
}

function render() {
  renderBoard();
  renderMessage();
  playAgainBtn.disabled = !winner;
}

function renderBoard() {
  board.forEach(function (sqVal, idx) {
    const squareEl = document.getElementById(`sq${idx}`);
    squareEl.style.backgroundColor = COLORS[sqVal];
    squareEl.className = !sqVal ? 'avail' : '';
  });
}

function renderMessage() {
  if (winner === 'T') {
    messageEl.innerHTML = 'Rats, another tie!';
  } else if (winner) {
    messageEl.innerHTML = `Congrats <span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span>!`;
  } else {
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
  }
}

