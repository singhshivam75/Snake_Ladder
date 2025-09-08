import React from 'react';

const PlayerToken = ({ id, color, hasWon, isCurrentTurn }) => {
  return (
    <div
      id={id}
      className={`absolute w-[60px] h-[60px] z-50 pointer-events-none transition-transform duration-500 ease-in-out ${hasWon ? 'opacity-20 grayscale' : ''}`}
      style={{ top: 0, left: 0 }}
    >
      <img
        src={`/assets/${color}.png`}
        alt={`${color} token`}
        className={`w-full h-full object-contain ${isCurrentTurn ? 'animate-pulse ring-2 ring-yellow-400 rounded-full' : ''}`}
      />
    </div>
  );
};

export default PlayerToken;
