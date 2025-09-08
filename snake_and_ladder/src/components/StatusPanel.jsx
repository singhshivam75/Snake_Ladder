import React from 'react';

const StatusPanel = ({ players, winners }) => {
  return (
    <div className="absolute top-10 left-10 bg-white/90 text-black rounded-xl p-6 shadow-xl w-64 z-50">
      <h2 className="text-xl font-bold mb-4 text-center">📋 Player Status</h2>
      <ul className="space-y-2">
        {players.map((player) => {
          const isWinner = winners.some((w) => w.id === player.id);
          return (
            <li
              key={player.id}
              className={`flex items-center justify-between gap-2 p-2 rounded-md ${isWinner ? 'bg-green-100 font-semibold' : 'bg-gray-100'}`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={`/assets/${player.color}.png`}
                  alt={`${player.color} token`}
                  className="w-6 h-6"
                />
                <span>{player.name}</span>
              </div>
              <span className="text-sm">{isWinner ? '🏁 Finished' : `📍 ${player.position}`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatusPanel;