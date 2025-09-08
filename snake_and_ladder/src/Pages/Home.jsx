import React from 'react';
import { useNavigate } from 'react-router-dom';
import snakesnladder from '/assets/snakesnladders.png';

const Home = () => {
  const navigate = useNavigate();

  const goToPlayerSelection = () => {
    navigate('/select-players');
  };

  return (
    <div className="bg-[url('/assets/bg-image1.webp')] bg-no-repeat bg-center bg-cover h-screen m-0 flex flex-col justify-center items-center font-['Arial','sans-serif']">
      <img
        src={snakesnladder}
        alt="Snakes and Ladders"
        className="w-[900px] transition-transform duration-100 ease-in-out delay-100 mb-10 hover:scale-105"
      />
      <button
        onClick={goToPlayerSelection}
        className="w-[400px] text-[45px] bg-[#4caf50] text-white cursor-pointer transition-transform duration-100 ease-in-out delay-100 px-5 py-5 rounded-[10px] border-none hover:bg-[#347838] hover:scale-110"
      >
        Play Now
      </button>
    </div>
  );
};

export default Home;
