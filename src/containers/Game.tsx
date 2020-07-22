import React, { useState } from 'react';

import Row from '../components/Row';

export default function Game() {
  const [grid, setGrid] = useState([
    [
      {
        status:"o",
        flagged: false
      },
      {
        status:"o",
        flagged: false
      },
      {
        status:"o",
        flagged: false
      }
    ],
    [
      {
        status:"o",
        flagged: false
      },
      {
        status:"o",
        flagged: false
      },
      {
        status:"o",
        flagged: false
      }],
    [
      {
        status:"o",
        flagged: false
      },
      { 
        status:"o",
        flagged: false
      },
      {
        status:"o",
        flagged: false
      } 
    ]
  ]);

  function updateGrid(rowIndex: number, cellIndex: number) {
    const newGrid = grid.map((row, index) => {
      if (index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex) return cell;
        cell.status = "x";
        return cell;
      });
    });

    setGrid(newGrid);
  }

  function flagCell(rowIndex, cellIndex) {
    const newGrid = grid.map((row, index) => {
      if (index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex) return cell;
        cell.flagged = true;
        return cell;
      });
    });

    setGrid(newGrid);
  }

  return (
    <div id='container'>
      {
        grid.map((row, index) => (
          <div className='row'>
            <Row row={row} rowIndex={index} updateGrid={updateGrid} flagCell={flagCell} />
          </div>
        ))
      }
    </div>
  )
}
