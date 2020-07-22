import React from 'react';

import Cell from './Cell';

export default function Row(props) {
  return (
    props.row.map((cell, index: number) => <Cell 
      rowIndex={props.rowIndex} 
      cellIndex={index} 
      updateGrid={props.updateGrid} 
      flagCell={props.flagCell}
      value={cell.status}
      flagged={cell.flagged}
    />)
  );
}