import WinnerPopup from '../components/WinnerPopup';
import RestartButton from '../components/RestartButton';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from '@fortawesome/free-solid-svg-icons';

const diceIcons = [
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
];

const snakes = {
  17: 7, 54: 34, 62: 19, 64: 60,
  87: 24, 93: 73, 95: 75, 98: 79
};

const ladders = {
  1: 38, 4: 14, 9: 31, 21: 42,
  28: 84, 51: 67, 71: 91, 80: 100
};

const GameBoard = () => {
  const boardRef = useRef(null);
  const playerNameRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [currentDiceIcon, setCurrentDiceIcon] = useState(faDiceOne);
  const currentPlayerIndexRef = useRef(0);
  const [winners, setWinners] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [recentWinner, setRecentWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const initializedPlayers = storedPlayers.map((player, index) => ({
      ...player,
      id: `player-${player.color}`,
      position: 1,
      unlocked: false,
      hasWon: false,
      isCurrentTurn: index === 0
    }));
    setPlayers(initializedPlayers);
    createBoard();

    setTimeout(() => {
      initializedPlayers.forEach(movePlayer);
      const active = initializedPlayers.find(p => !p.hasWon);
      if (active) {
        playerNameRef.current.textContent = `${active.name}'s Turn`;
      }
    }, 100);
  }, []);

  const createBoard = () => {
    const board = boardRef.current;
    board.innerHTML = '';
    for (let row = 9; row >= 0; row--) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        board.appendChild(cell);
      }
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const animateDice = async () => {
    for (let i = 0; i < 8; i++) {
      const rand = Math.floor(Math.random() * 6);
      setCurrentDiceIcon(diceIcons[rand]);
      await delay(100);
    }
  };

  const movePlayer = (player) => {
    const board = boardRef.current;
    const cells = board.querySelectorAll('.cell');
    const pos = player.position;
    if (pos < 1 || pos > 100) return;

    const row = 9 - Math.floor((pos - 1) / 10);
    const colRaw = (pos - 1) % 10;
    const isLTR = (9 - row) % 2 === 0;
    const col = isLTR ? colRaw : 9 - colRaw;
    const index = row * 10 + col;
    const cell = cells[index];
    const cellRect = cell.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const x = cellRect.left - boardRect.left + cell.offsetWidth / 2 - 30;
    const y = cellRect.top - boardRect.top + cell.offsetHeight / 2 - 30;

    const token = document.getElementById(player.id);
    if (token) token.style.transform = `translate(${x}px, ${y}px)`;
  };

  const playTurn = async () => {
    if (gameOver) return;
    const rollBtn = document.getElementById('rollBtn');
    rollBtn.disabled = true;

    const index = currentPlayerIndexRef.current;
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[index];

    if (currentPlayer.hasWon) {
      nextPlayer(updatedPlayers);
      return;
    }

    playerNameRef.current.textContent = `${currentPlayer.name}'s Turn`;

    await animateDice();
    const diceRoll = Math.floor(Math.random() * 6);
    const steps = diceRoll + 1;
    setCurrentDiceIcon(diceIcons[diceRoll]);

    if (!currentPlayer.unlocked) {
      if (steps === 6) {
        currentPlayer.unlocked = true;
      } else {
        nextPlayer(updatedPlayers);
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

    const others = updatedPlayers.filter((p, i) => i !== index);
    const hit = others.find(p => p.position === currentPlayer.position && !p.hasWon);
    if (hit) {
      alert(`${currentPlayer.name} hit ${hit.name}. Sending them home.`);
      hit.position = 1;
      movePlayer(hit);
    }

    if (currentPlayer.position === 100 && !currentPlayer.hasWon) {
      currentPlayer.hasWon = true;
      setWinners(prev => [...prev, currentPlayer]);
      setRecentWinner(currentPlayer);
      setShowPopup(true);
    }

    setPlayers(updatedPlayers);

    const activePlayers = updatedPlayers.filter(p => !p.hasWon);
    if (activePlayers.length <= 1) {
      setGameOver(true);
      return;
    }

    if (steps === 6 && !currentPlayer.hasWon) {
      rollBtn.disabled = false;
      return;
    }

    nextPlayer(updatedPlayers);
  };

  const nextPlayer = (updatedPlayers) => {
    let nextIndex = currentPlayerIndexRef.current;
    const total = updatedPlayers.length;
    for (let i = 1; i <= total; i++) {
      const next = (nextIndex + i) % total;
      if (!updatedPlayers[next].hasWon) {
        currentPlayerIndexRef.current = next;
        updatedPlayers = updatedPlayers.map((p, i) => ({
          ...p,
          isCurrentTurn: i === next
        }));
        setPlayers(updatedPlayers);
        playerNameRef.current.textContent = `${updatedPlayers[next].name}'s Turn`;

        const rollBtn = document.getElementById('rollBtn');
        rollBtn.disabled = false;

        if (updatedPlayers[next].isBot) {
          setTimeout(() => {
            playTurn();
          }, 1000);
        }
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bg-image7.jpeg')] bg-cover bg-center z-0 blur-[5px]"></div>
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {showPopup && recentWinner && !gameOver && (
        <WinnerPopup
          winner={recentWinner}
          onClose={() => setShowPopup(false)}
        />
      )}
      <RestartButton />

      <div className="relative z-10 w-full">
        <div className="container flex gap-8 w-full h-full items-center justify-center">
          <div className="rollDice w-[220px] h-[260px] bg-gradient-to-b from-green-200 to-green-400 p-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center mt-[360px] border-2 border-green-700">
            <div ref={playerNameRef} className="text-center font-bold text-lg text-black mb-2"></div>
            <div className="text-[90px] text-green-900 mb-2 drop-shadow-lg">
              <FontAwesomeIcon icon={currentDiceIcon} />
            </div>
            <button
              id="rollBtn"
              onClick={playTurn}
              className="mt-3 px-6 py-2 text-lg bg-green-700 hover:bg-green-800 text-white rounded-xl transition-all shadow-md"
              disabled={gameOver}
            >
              🎲 Roll Dice
            </button>
          </div>

          <div className="gameboard w-[800px] h-[800px] border-[3px] border-black bg-[url('/assets/bg-image.jpg')] bg-cover bg-center rounded-lg relative overflow-hidden">
            <div ref={boardRef} className="board grid grid-cols-10 grid-rows-10 w-full h-full relative"></div>

            {players.map(player => (
              <div
                key={player.id}
                id={player.id}
                className={`absolute w-[60px] h-[60px] z-50 pointer-events-none transition-transform duration-500 ease-in-out ${player.hasWon ? 'opacity-20 grayscale' : ''}`}
                style={{ top: 0, left: 0 }}
              >
                <img
                  src={`/assets/${player.color}.png`}
                  alt={`${player.color} token`}
                  className={`w-full h-full object-contain ${player.isCurrentTurn ? 'animate-pulse ring-2 ring-yellow-400 rounded-full' : ''}`}
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
