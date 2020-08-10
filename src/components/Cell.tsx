import React from 'react';

const colors = ["black", "palevioletred", "red", "purple", "tan", "darkorchid", "turquoise", "black", "gray"];

export default function Cell({rowIndex, cellIndex, detectShift, value, opened, adjacentBombs}: any) {
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
