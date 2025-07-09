// === Constants and DOM references ===
const puzzle = document.getElementById('puzzle');
const cols = 5;
const rows = 3;
let tiles = [];
let currentImageUrl = 'image.png';
let startTime;
let timerInterval;
let timerStarted = false;
let draggedTile = null;

// === Timer Functions ===
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent = `Time: ${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

// === Tile Creation and Rendering ===
function createTiles() {
  tiles = [];
  for (let i = 0; i < cols * rows; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('draggable', true);
    
    const row = Math.floor(i / cols);
    const col = i % cols;
    tile.style.backgroundImage = `url('${currentImageUrl}')`;
    tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    tile.dataset.index = i;

    tile.addEventListener('dragstart', handleDragStart);
    tile.addEventListener('dragover', handleDragOver);
    tile.addEventListener('drop', handleDrop);
    tile.addEventListener('dragend', () => tile.classList.remove('dragging'));

    tiles.push(tile);
  }
}

function renderTiles() {
  puzzle.innerHTML = '';
  tiles.forEach(tile => puzzle.appendChild(tile));
}

// === Shuffle and Image Change ===
function shuffle() {
  closePopup();
  stopTimer();
  document.getElementById('timer').textContent = `Time: 0s`;
  timerStarted = false;

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  renderTiles();
  checkWin();
}

function changeImage() {
  closePopup();
  stopTimer();
  document.getElementById('timer').textContent = `Time: 0s`;
  timerStarted = false;

  const newImage = new Image();
  const seed = Math.floor(Math.random() * 1000);
  const newUrl = `https://picsum.photos/seed/${seed}/500/300`;

  newImage.onload = () => {
    currentImageUrl = newUrl;
    createTiles();
    shuffle();
  };

  newImage.onerror = () => {
    currentImageUrl = 'default.jpg';
    createTiles();
    shuffle();
  };

  newImage.src = newUrl;
}

// === Drag and Drop Handlers ===
function handleDragStart(e) {
  if (this.classList.contains('correct')) return;

  draggedTile = this;
  this.classList.add('dragging');

  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (!draggedTile || draggedTile === this || this.classList.contains('correct')) return;

  const fromIndex = tiles.indexOf(draggedTile);
  const toIndex = tiles.indexOf(this);

  [tiles[fromIndex], tiles[toIndex]] = [tiles[toIndex], tiles[fromIndex]];
  renderTiles();
  checkWin();
}

// === Win Condition Check ===
function checkWin() {
  let isComplete = true;

  tiles.forEach((tile, i) => {
    const correct = parseInt(tile.dataset.index) === i;

    if (correct) {
      tile.classList.add('correct');
      tile.setAttribute('draggable', false);
    } else {
      tile.classList.remove('correct');
      tile.setAttribute('draggable', true);
      isComplete = false;
    }
  });

  if (isComplete) {
    stopTimer();
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('completionTime').textContent = `You completed the puzzle in ${minutes}m ${seconds.toString().padStart(2, '0')}s!`;
    document.getElementById('popup').style.display = 'flex';
  }
}

// === Popup Controls ===
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function openRules() {
  document.getElementById('rulesPopup').style.display = 'flex';
}

function closeRules() {
  document.getElementById('rulesPopup').style.display = 'none';
}

// === Game Initialization ===
createTiles();
shuffle();
