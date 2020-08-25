import React from 'react';

const colors = ["black", "palevioletred", "red", "purple", "tan", "darkorchid", "turquoise", "black", "gray"];
const colors2 = ["black", "blue", "green", "red", "purple", "black", "maroon", "gray", "turquoise"];

export default function Cell({rowIndex, cellIndex, detectShift, value, opened, adjacentBombs, theme}: any) {
 
  return (
  <div 
  className='cell' 
  onClick={() => detectShift(rowIndex, cellIndex, event)} 
  style={{background: opened ?  'whitesmoke' : 'darkgray', color: theme==="pink"? colors[adjacentBombs]: colors2[adjacentBombs]}}
  >
    {value}
  </div>
  );
}
