const dice_icon = document.getElementById('dice-icon');
const rollDice = document.getElementById('rollDice');
const board = document.getElementById('board');

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

function rollDiceFunction() {
  rollDice.addEventListener('click', async () => {
    const diceRoll = Math.floor(Math.random() * 6); // 0–5
    const steps = diceRoll + 1; // 1–6
    dice_icon.innerHTML = diceIcons[diceRoll];

    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer.unlocked) {
      if (steps === 6) {
        currentPlayer.unlocked = true;
      } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        return;
      }
    }

    // Step-by-step movement
    for (let i = 0; i < steps; i++) {
      if (currentPlayer.position < 100) {
        currentPlayer.position++;
        movePlayer(currentPlayer);
        await delay(300); // wait 300ms per step
      }
    }

    // Check for ladders or snakes
    if (ladders[currentPlayer.position]) {
      await delay(300);
      currentPlayer.position = ladders[currentPlayer.position];
      movePlayer(currentPlayer);
    } else if (snakes[currentPlayer.position]) {
      await delay(300);
      currentPlayer.position = snakes[currentPlayer.position];
      movePlayer(currentPlayer);
    }

    // Check collision with other players
    const otherPlayers = players.filter((p, idx) => idx !== currentPlayerIndex);
    const sameCell = otherPlayers.find(p => p.position === currentPlayer.position);
    if (sameCell) {
      alert(`${currentPlayer.name || currentPlayer.id} landed on ${sameCell.name || sameCell.id}. Sending them back to START!`);
      sameCell.position = 1;
      movePlayer(sameCell);
    }

    // Check for win
    if (currentPlayer.position === 100) {
      setTimeout(() => {
        alert(`${currentPlayer.name || currentPlayer.id} wins!`);
        // Optional: mark player as done & continue game
      }, 300);
      return;
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  });

  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  botTurn(); 


}

rollDiceFunction();

function botTurn() {
  const bot = players[currentPlayerIndex];
  if (!bot.isBot) return;

  setTimeout(() => {
    rollDice.click();
  }, 1000);
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
