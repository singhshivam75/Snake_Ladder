import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceOne, faDiceTwo, faDiceThree,
  faDiceFour, faDiceFive, faDiceSix
} from '@fortawesome/free-solid-svg-icons';

const diceIcons = [
  faDiceOne, faDiceTwo, faDiceThree,
  faDiceFour, faDiceFive, faDiceSix
];

const DicePanel = ({ currentDice, onRoll, disabled, playerNameRef }) => {
  return (
    <div className="rollDice w-[220px] h-[260px] bg-gradient-to-b from-green-200 to-green-400 p-4 rounded-2xl shadow-2xl flex flex-col justify-center items-center mt-[360px] border-2 border-green-700">
      <div ref={playerNameRef} className="text-center font-bold text-lg text-black mb-2" />
      <div className="text-[90px] text-green-900 mb-2 drop-shadow-lg">
        <FontAwesomeIcon icon={diceIcons[currentDice - 1]} />
      </div>
      <button
        id="rollBtn"
        onClick={onRoll}
        disabled={disabled}
        className="mt-3 px-6 py-2 text-lg bg-green-700 hover:bg-green-800 text-white rounded-xl transition-all shadow-md"
      >
        🎲 Roll Dice
      </button>
    </div>
  );
};

export default DicePanel;
