import React from 'react';

export default function Cell({ rowIndex, cellIndex, detectShift, value, opened }) {
  return (
  <div className='cell' onClick={() => detectShift(rowIndex, cellIndex, event)} style={{background: opened ?  'white' : 'gray'}}>{value}</div>
  );
}
