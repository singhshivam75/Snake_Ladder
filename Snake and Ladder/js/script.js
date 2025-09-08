const dice_icon = document.getElementById('dice-icon');
const rollDice = document.getElementById('rollDice');
const board = document.getElementById('board');
const playerNameDisplay = document.getElementById('playerName');

const diceIcons = [
  '<i class="fas fa-dice-one"></i>',
  '<i class="fas fa-dice-two"></i>',
  '<i class="fas fa-dice-three"></i>',
  '<i class="fas fa-dice-four"></i>',
  '<i class="fas fa-dice-five"></i>',
  '<i class="fas fa-dice-six"></i>'
];

const snakes = {
  17: 7, 54: 34, 62: 19, 64: 60,
  87: 24, 93: 73, 95: 75, 98: 79
};

const ladders = {
  1: 38, 4: 14, 9: 31, 21: 42,
  28: 84, 51: 67, 71: 91, 80: 100
};

const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
const players = storedPlayers.map(player => ({
  ...player,
  id: `player-${player.color}`,
  isBot: player.isBot || false,
  position: 1,
  unlocked: false
}));

["red", "blue", "yellow", "green"].forEach(color => {
  const token = document.getElementById(`player-${color}`);
  if (!players.find(p => p.color === color)) {
    token.style.display = "none";
  }
});

let currentPlayerIndex = 0;

function addNumberInBoxes() {
  for (let row = 9; row >= 0; row--) {
    const isEven = row % 2 === 0;
    for (let col = 0; col < 10; col++) {
      const num = row * 10 + (isEven ? col + 1 : 10 - col);
      const cell = document.createElement("div");
      cell.textContent = num;
      board.appendChild(cell);
    }
  }
}
addNumberInBoxes();

function movePlayer(player) {
  const cells = document.querySelectorAll('.board div');
  const position = player.position;
  if (position < 1 || position > 100) return;

  const row = 9 - Math.floor((position - 1) / 10);
  const colRaw = (position - 1) % 10;
  const isLeftToRight = (9 - row) % 2 === 0;
  const col = isLeftToRight ? colRaw : 9 - colRaw;

  const index = row * 10 + col;
  const cell = cells[index];

  const boardRect = board.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();
  const token = document.getElementById(player.id);

  token.style.left = `${cellRect.left - boardRect.left + 5}px`;
  token.style.top = `${cellRect.top - boardRect.top + 5}px`;
}

async function animateDice() {
  for (let i = 0; i < 8; i++) {
    const random = Math.floor(Math.random() * 6);
    dice_icon.innerHTML = diceIcons[random];
    await delay(100);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playTurn() {
  rollDice.disabled = true;

  const currentPlayer = players[currentPlayerIndex];
  playerNameDisplay.textContent = `${currentPlayer.name || currentPlayer.id}'s Turn`;

  await animateDice();
  const diceRoll = Math.floor(Math.random() * 6);
  const steps = diceRoll + 1;
  dice_icon.innerHTML = diceIcons[diceRoll];

  if (!currentPlayer.unlocked) {
    if (steps === 6) {
      currentPlayer.unlocked = true;
    } else {
      nextPlayer();
      return;
    }
  }

  for (let i = 0; i < steps; i++) {
    if (currentPlayer.position < 100) {
      currentPlayer.position++;
      movePlayer(currentPlayer);
      await delay(300);
    }
  }

  if (ladders[currentPlayer.position]) {
    await delay(300);
    currentPlayer.position = ladders[currentPlayer.position];
    movePlayer(currentPlayer);
  } else if (snakes[currentPlayer.position]) {
    await delay(300);
    currentPlayer.position = snakes[currentPlayer.position];
    movePlayer(currentPlayer);
  }

  const others = players.filter((p, i) => i !== currentPlayerIndex);
  const hit = others.find(p => p.position === currentPlayer.position);
  if (hit) {
    alert(`${currentPlayer.name || currentPlayer.id} hit ${hit.name || hit.id}. Sending them home.`);
    hit.position = 1;
    movePlayer(hit);
  }

  if (currentPlayer.position === 100) {
    alert(`${currentPlayer.name || currentPlayer.id} wins!`);
    return;
  }

  if (steps === 6) {
    if (currentPlayer.isBot) {
      await delay(1000);
      playTurn();
    } else {
      rollDice.disabled = false;
    }
    return;
  }

  nextPlayer();
}

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

  const nextPlayer = players[currentPlayerIndex];
  playerNameDisplay.textContent = `${nextPlayer.name || nextPlayer.id}'s Turn`;

  if (nextPlayer.isBot) {
    setTimeout(() => playTurn(), 1000);
  } else {
    rollDice.disabled = false;
  }
}

function rollDiceFunction() {
  rollDice.addEventListener('click', () => playTurn());
}
rollDiceFunction();

window.onload = () => {
  if (players[currentPlayerIndex].isBot) {
    setTimeout(() => playTurn(), 1000);
  } else {
    playerNameDisplay.textContent = `${players[currentPlayerIndex].name || players[currentPlayerIndex].id}'s Turn`;
  }
};
