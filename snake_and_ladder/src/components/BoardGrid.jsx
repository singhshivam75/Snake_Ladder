import React, { useEffect } from 'react';

const BoardGrid = ({ boardRef }) => {
  useEffect(() => {
    const board = boardRef.current;
    board.innerHTML = '';
    for (let row = 9; row >= 0; row--) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        board.appendChild(cell);
      }
    }
  }, [boardRef]);

  return (
    <div
      ref={boardRef}
      className="board grid grid-cols-10 grid-rows-10 w-full h-full relative"
    />
  );
};

export default BoardGrid;
