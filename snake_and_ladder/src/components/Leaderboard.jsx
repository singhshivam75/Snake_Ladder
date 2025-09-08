import React from 'react';

const Leaderboard = ({ winners }) => {
  return (
    <div className="absolute top-10 right-10 bg-white/90 text-black rounded-xl p-6 shadow-xl w-64 z-50">
      <h2 className="text-xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <ol className="list-decimal list-inside space-y-2">
        {winners.map((player, index) => (
          <li key={player.id} className="flex items-center gap-2">
            <img
              src={`/assets/${player.color}.png`}
              alt={`${player.color} token`}
              className="w-6 h-6"
            />
            <span>
              {index + 1}. {player.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
