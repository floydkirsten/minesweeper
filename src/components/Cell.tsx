import React from 'react';

const colors = ["black", "blue", "green", "red", "darkBlue"];

export default function Cell({ rowIndex, cellIndex, detectShift, value, opened, adjacentBombs }) {
  return (
  <div 
  className='cell' 
  onClick={() => detectShift(rowIndex, cellIndex, event)} 
  style={{background: opened ?  'whitesmoke' : 'darkgray', color: colors[adjacentBombs]}}
  >
    {value}
  </div>
  );
}
