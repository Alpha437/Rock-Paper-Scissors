'use strict';

const mainApp = document.querySelector('.app');
const score = document.querySelector('.score-count');
const gameBody = document.querySelector('.game-body');
const moves = document.querySelector('.moves');
const triangle = document.querySelector('.bg-triangle');
const moveBtn = document.querySelectorAll('.move--wrapper');
const gameActive = document.querySelector('.game-active');
const userMoveIcon = document.querySelector('.user-move-icon');
const moveIcon = document.querySelectorAll('.move-icon');
const userMove = document.querySelectorAll('.user-pick');
const result = document.querySelector('.result');
const resultText = document.querySelector('.result-text');
const rulesBtn = document.querySelector('.rules');
const replayBtn = document.querySelector('.replay');
const hidden = document.querySelector('.hidden');

// Destructuring
const [playerMove, houseMove] = moveIcon;
const [player, house] = userMove;
let scoreCount = 0;

let pMove, hMove;
function resetGame() {
  moves.style.display = 'grid';
  triangle.style.display = 'inline-block';
  gameActive.style.display = 'none';
  result.style.display = 'none';
  playerMove.classList.toggle(`${pMove}`);
  houseMove.classList.toggle(`${hMove}`);
}

function collapseMoves() {
  moves.style.display = 'none';
  triangle.style.display = 'none';
}

function pickMove() {
  collapseMoves();
  const moveName = this.classList[1];
  const hidden =
    '<img src="./images/icon-paper.svg" alt="" class="paper-image user-move-icon" style="visibility: hidden;"></img>';
  const rps = ['rock', 'paper', 'scissors'];
  const randomMove = rps[Math.trunc(rps.length * Math.random())];
  let html;

  // Player move
  html = `<img src="./images/icon-${moveName}.svg" alt="" class="paper-image user-move-icon">
  `;
  playerMove.classList.toggle(`${moveName}`);
  playerMove.innerHTML = html;
  houseMove.innerHTML = hidden;
  houseMove.style.background = 'var(--bg-color2)';
  gameActive.style.display = 'grid';

  // Computer move

  setTimeout(() => {
    houseMove.style.background =
      'linear-gradient(to bottom, rgb(219, 219, 219), white)';
    html = `<img src="./images/icon-${randomMove}.svg" alt="" class="paper-image user-move-icon hidden">
    `;
    houseMove.classList.toggle(`${randomMove}`);
    houseMove.innerHTML = html;
  }, 5000);

  // Decide winner
  setTimeout(() => {
    decideWinner(moveName, randomMove);
    [pMove, hMove] = [moveName, randomMove];

    // Update score
    if (scoreCount >= 0) {
      score.textContent =
        scoreCount < 10 ? scoreCount.toString().padStart(2, '0') : scoreCount;
    } else {
      scoreCount = 0;
      score.textContent = '00';
    }
  }, 7000);
}

function decideWinner(player, computer) {
  if (player == 'paper' && computer == 'rock') {
    resultText.textContent = 'You win';
    scoreCount++;
  } else if (player == 'rock' && computer == 'scissors') {
    resultText.textContent = 'You win';
    scoreCount++;
  } else if (player == 'scissors' && computer == 'paper') {
    resultText.textContent = 'You win';
    scoreCount++;
  } else if (player == computer) {
    resultText.textContent = 'Draw';
    scoreCount = scoreCount;
  } else {
    resultText.textContent = 'You lose';
    scoreCount--;
  }
  result.style.display = 'block';
}

moveBtn.forEach((move) => move.addEventListener('click', pickMove));
replayBtn.addEventListener('click', resetGame);