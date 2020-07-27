/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Cell from './Cell';

export default function Row(props) {
  return (
    props.row.map((cell, index: number) => (
      <Cell
        rowIndex={props.rowIndex}
        cellIndex={index}
        handleClick={props.handleClick}
        flagCell={props.flagCell}
        value={cell.value}
        bomb={cell.bomb}
        flagged={cell.flagged}
        opened={cell.opened}
      />
    ))
  );
}
