const board = document.getElementById('game-board');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let cards = ['🍎', '🍌', '🍓', '🍇', '🍎', '🍌', '🍓', '🍇'];
let flippedCards = [];
let matched = 0;
let score = 0;
let timer = 0;
let interval;

function startTimer() {
  timer = 0;
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matched = 0;
  score = 0;
  scoreEl.textContent = score;
  cards = shuffle(cards);
  startTimer();
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('matched') || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched++;
    score += 10;
  } else {
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    score -= 2;
  }

  flippedCards = [];
  scoreEl.textContent = score;

  if (matched === cards.length / 2) {
    clearInterval(interval);
    alert(`🎉 You won! Time: ${timer}s, Score: ${score}`);
  }
}

resetGame();
