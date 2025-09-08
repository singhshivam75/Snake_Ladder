import React from 'react';
import './WinnerPopup.css';

const WinnerPopup = ({ winner, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 text-center bounce-once">
        <h2 className="text-3xl font-bold mb-4">🎉 {winner.name} Wins!</h2>
        <img
          src={`/assets/${winner.color}.png`}
          alt={`${winner.color} token`}
          className="w-16 h-16 mx-auto mb-4 animate-pulse"
        />
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WinnerPopup;
