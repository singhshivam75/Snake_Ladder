import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerSetup = () => {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState([]);
  const colorOptions = ['red', 'blue', 'green', 'yellow'];

  useEffect(() => {
    const count = parseInt(localStorage.getItem('playerCount')) || 2;
    setPlayerCount(count);
    setPlayers(Array(count).fill({ name: '', color: '' }));
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (players.some(p => !p.name.trim() || !p.color)) {
      alert('Please fill in name and color for all players.');
      return;
    }

    const colorSet = new Set(players.map(p => p.color));
    if (colorSet.size < players.length) {
      alert('Each player must have a unique color.');
      return;
    }

    const finalPlayers = players.map(player => ({
      ...player,
      position: 1,
    }));

    localStorage.setItem('players', JSON.stringify(finalPlayers));
    navigate('/gameBoard');
  };

  const getUsedColors = (currentIndex) => {
    return players
      .map((p, i) => (i !== currentIndex ? p.color : null))
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-[url('/assets/bg-image3.jpg')] bg-cover bg-center flex justify-center items-center font-sans text-white">
      <div className="bg-black/60 p-10 rounded-xl shadow-lg w-[90%] max-w-[1000px] text-center">
        <h1 className="text-5xl font-bold mb-10">Customize Your Players</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between gap-5">
            {players.map((player, index) => (
              <div
                key={index}
                className="player-block flex-1 min-w-[200px] bg-white/20 p-[15px] rounded-[10px]"
              >
                <label className="block mb-[5px] font-bold text-xl">
                  Player {index + 1} Name
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handleInputChange(index, 'name', e.target.value)
                  }
                  required
                  placeholder="Enter name"
                  className="w-full p-[8px_10px] mb-[10px] rounded-[8px] border border-[#ccc] bg-white text-black focus:outline-none focus:border-black"
                />

                <label className="block mb-[5px] font-bold text-xl">
                  Player {index + 1} Color
                </label>
                <select
                  value={player.color}
                  onChange={(e) =>
                    handleInputChange(index, 'color', e.target.value)
                  }
                  required
                  className="w-full p-[8px_10px] mb-[10px] rounded-[8px] border border-[#ccc] bg-white text-black focus:outline-none focus:border-black"
                >
                  <option value="">Choose a color</option>
                  {colorOptions.map((color) => {
                    const usedColors = getUsedColors(index);
                    return (
                      <option
                        key={color}
                        value={color}
                        disabled={usedColors.includes(color)}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg transition"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSetup;
