import React, { useEffect, useState } from 'react';

const GameTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-black px-4 py-2 rounded-md shadow z-50">
      ⏳ Time: {formatTime(seconds)}
    </div>
  );
};

export default GameTimer;