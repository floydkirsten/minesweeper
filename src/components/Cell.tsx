import React from 'react';

export default function Cell({ rowIndex, cellIndex, updateGrid, value }) {
  return (
    <div className='cell' onClick={() => updateGrid(rowIndex, cellIndex)}>{value}</div>
  );
}
