/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Cell from './Cell';

export default function Row(props: {row: any, rowIndex: any, detectShift: any}) {
  return (
    props.row.map((cell: { value: any; opened: any; adjacentBombs: any;}, index: number) => (
      <Cell
        rowIndex={props.rowIndex}
        cellIndex={index}
        detectShift={props.detectShift}
        value={cell.value}
        opened={cell.opened}
        adjacentBombs={cell.adjacentBombs}
      />
    ))
  );
}
