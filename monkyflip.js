// Game Configuration
const cardsArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Game Variables
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

// Initialize the game
function initGame() {
  const gameBoard = document.getElementById('game-board');
  const shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Handle card click
function handleCardClick() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }
}

// Check if the two cards match
function checkForMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    matchesFound++;
    resetCards();
    if (matchesFound === cardsArray.length / 2) {
      alert('You won!');
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.classList.remove('flipped');
      secondCard.textContent = '';
      resetCards();
    }, 1000);
  }
}

// Reset card variables
function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Start the game
initGame();
