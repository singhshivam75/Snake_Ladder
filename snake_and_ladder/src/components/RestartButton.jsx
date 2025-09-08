import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestartButton = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem('players');
    navigate('/');
  };

  return (
    <button
      onClick={handleRestart}
      className="absolute bottom-10 right-10 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-xl shadow-md z-50"
    >
      🔄 Restart Game
    </button>
  );
};

export default RestartButton;