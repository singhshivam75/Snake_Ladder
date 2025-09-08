import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectPlayers = () => {
  const navigate = useNavigate();

  const goToCustomizePage = (playerCount) => {
    if (parseInt(playerCount) === 1) {
      const players = [
        { name: "Player 1", color: "red", isBot: false },
        { name: "Bot", color: "blue", isBot: true }
      ];
      localStorage.setItem("players", JSON.stringify(players));
      navigate('/gameBoard');
    } else {
      localStorage.setItem('playWithBot', 'false');
      localStorage.setItem('playerCount', playerCount);
      navigate('/player-setup');
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-[url('/assets/bg-image2.webp')] bg-center bg-cover overflow-hidden"
    >
      <button
        title="Single Player"
        className="absolute w-[130px] h-[130px] rounded-full bg-white/5 border-none hover:bg-white/20 transition duration-300"
        style={{ top: '41.8%', left: '72.1%' }}
        onClick={() => goToCustomizePage(1)}
      />
      <button
        title="2 Players"
        className="absolute w-[130px] h-[130px] rounded-full bg-white/5 border-none hover:bg-white/20 transition duration-300"
        style={{ top: '66.4%', left: '60.8%' }}
        onClick={() => goToCustomizePage(2)}
      />
      <button
        title="3 Players"
        className="absolute w-[130px] h-[130px] rounded-full bg-white/5 border-none hover:bg-white/20 transition duration-300"
        style={{ top: '66.4%', left: '72.1%' }}
        onClick={() => goToCustomizePage(3)}
      />
      <button
        title="4 Players"
        className="absolute w-[130px] h-[130px] rounded-full bg-white/5 border-none hover:bg-white/20 transition duration-300"
        style={{ top: '66.4%', left: '83.3%' }}
        onClick={() => goToCustomizePage(4)}
      />
    </div>
  );
};

export default SelectPlayers;