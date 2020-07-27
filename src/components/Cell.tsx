import React from 'react';

export default function Cell({ rowIndex, cellIndex, handleClick, value, flagCell, flagged, bomb, opened }) {
  return (
  <div className='cell' onClick={() => handleClick(rowIndex, cellIndex, false)} onContextMenu={() => flagCell(rowIndex, cellIndex)} style={{background: opened ?  'white' : 'gray'}}>{value}</div>
  );
}
