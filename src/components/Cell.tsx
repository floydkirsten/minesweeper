import React from 'react';

export default function Cell({ rowIndex, cellIndex, updateGrid, value, flagCell, flagged }) {
  return (
    <div className='cell' onClick={() => updateGrid(rowIndex, cellIndex)} onContextMenu={() => flagCell(rowIndex, cellIndex)} style={{background: flagged ?  'pink' : 'gray'}}>{value}{flagged}</div>
  );
}
