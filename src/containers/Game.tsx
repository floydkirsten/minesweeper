import React, { useState } from 'react';

import Row from '../components/Row';
import Button from '../components/Button';
import Counter from '../components/Counter';

export default function Game() {

  const [bombsLeft, setBombsLeft] = useState(3);

  const [grid, setGrid] = useState([
    [
      {
        bomb: false,
        flagged: false, 
        value: '',
        adjacentBombs: 0,
        opened: false
      },
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 2,
        opened: false
      },
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      }
    ],
    [
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      },
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      },
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      }],
    [
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      },
      { 
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      },
      {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false
      } 
    ]
  ]);

  function startGame() {
    //set bombs
    //check adjacents
    grid[0][0].bomb=true;
    grid[2][1].bomb=true;
    grid[2][0].bomb=true;

    for (var row=0;row<grid.length;row++) {
      for (var col=0;col<grid[0].length;col++) {
        checkAdjacent(row, col);
      }
    }
    
  }

  function handleClick(rowIndex: number, cellIndex: number, loop: boolean) {
    grid[rowIndex][cellIndex].opened=true;
    if(grid[rowIndex][cellIndex].bomb==true && !loop) {
      explode();
    } else {
      const newGrid = grid.map((row, index) => {
        if (index !== rowIndex) return row;
        return row.map((cell, index) => {
          if (index !== cellIndex) return cell;
          if (cell.adjacentBombs==0) {
            cell.value="";
            if (rowIndex>0 && cellIndex>0) handleClick(rowIndex-1, cellIndex-1, true);
            if (rowIndex>0) handleClick(rowIndex-1, cellIndex, true);
            if (cellIndex>0) handleClick(rowIndex, cellIndex-1, true);
            if (rowIndex<grid.length-1) handleClick(rowIndex+1, cellIndex, true);
            if (cellIndex<grid.length-1) handleClick(rowIndex, cellIndex+1, true);
            if (rowIndex<grid.length-1 && cellIndex<grid.length-1) handleClick(rowIndex+1, cellIndex+1, true);            
            if (rowIndex>0 && cellIndex<grid.length-1) handleClick(rowIndex-1, cellIndex+1, true);
            if (rowIndex<grid.length-1 && cellIndex>0) handleClick(rowIndex+1, cellIndex-1, true);
          } else {
            cell.value=cell.adjacentBombs.toString();
          }
          return cell;
        })
      });
      setGrid(newGrid);
      //update cell
      //call adjacents (not flagged or open)
    }
    if(isGameOver()==true) alert("You won!");
  }

  function explode() {
    const newGrid = grid.map((row) => {
      return row.map((cell) => {
        cell.opened=true;
        if (cell.bomb==true) {
          cell.value = "BOMB!"; 
        } else if (cell.adjacentBombs==0) {
          cell.value="";
        } else {
          cell.value = cell.adjacentBombs.toString();
        }
        return cell;
      })
    });

    setGrid(newGrid);

    //alert("Game over!");
  }

  function checkAdjacent(row: number, cell: number) {
    var bombCount=0;
   
    if (grid[row][cell].bomb==true) {
      grid[row][cell].adjacentBombs = -1;
    } else {
      if (row>0 && cell>0) {
        if (grid[row-1][cell-1].bomb==true) bombCount=bombCount+1;
      }
      if (row>0) {
        if (grid[row-1][cell].bomb==true) bombCount=bombCount+1;
      }
      if (cell>0) {
        if (grid[row][cell-1].bomb==true) bombCount=bombCount+1;
      }
      if (row<grid.length-1) {
        if (grid[row+1][cell].bomb==true) bombCount=bombCount+1;
      }
      if (cell<grid.length-1) {
        if (grid[row][cell+1].bomb==true) bombCount=bombCount+1;
      }
      if (row<grid.length-1 && cell<grid.length-1) {
        if (grid[row+1][cell+1].bomb==true) bombCount=bombCount+1;
      }
      if (row>0 && cell<grid.length-1) {
        if (grid[row-1][cell+1].bomb==true) bombCount=bombCount+1;
      }
      if (row<grid.length-1 && cell>0) {
        if (grid[row+1][cell-1].bomb==true) bombCount=bombCount+1;
      }
      grid[row][cell].adjacentBombs=bombCount;
    }
    
    //if (grid[rowIndex+1][cellIndex+1].status="bomb") bombCount=bombCount+1;

  /*   const checkGrid = grid.map((row, index) => {
      if (index !== rowIndex+1 || index !== rowIndex-1 || index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex+1 || index !== cellIndex-1 || index !== cellIndex) return cell;
        console.log("mapping");
        bombCount = bombCount+1;
        console.log(bombCount);
        return cell;
      })
    });

    setGrid(checkGrid);
    console.log(bombCount);
    
    const newGrid = grid.map((row, index) => {
      if (index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex) return cell;
        console.log("mapping");
        cell.value = bombCount.toString();
        return cell;
      })
    });

    grid.map((row, index) => {
      if(index !== rowIndex+1 || index !== rowIndex-1 || index !== rowIndex) return row;
      row.map((cell, index) => {
        if(index !== cellIndex+1 || index !== cellIndex-1 || index !== cellIndex) return cell;
        if (cell.bomb==true) bombCount=bombCount+1;
        console.log("test");
      })
    })


    setGrid(newGrid);
    grid[rowIndex][cellIndex].value=bombCount.toString();
    console.log(bombCount);
    console.log(grid[rowIndex][cellIndex].value); */
  }

  function isGameOver() {
    //all flagged or open
    if (bombsLeft==0) return true;
  }

  function flagCell(rowIndex: number, cellIndex: number) {
    //flag cell, bombcount down
    const newGrid = grid.map((row, index) => {
      if (index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex) return cell;
        cell.flagged = !cell.flagged;
        if (cell.flagged==true) {
          setBombsLeft(bombsLeft-1);
          cell.value="FLAG"
        } else {
          setBombsLeft(bombsLeft+1);
          cell.value=""
        }
        return cell;
      });
    });

    setGrid(newGrid);
    if (isGameOver()==true) alert("you won!");
  }

  function reset() {
    //start new game
    setBombsLeft(3);
    const newGrid = grid.map((row, index) => {
      return row.map((cell, index) => {
        if (cell.flagged==true) {
          cell.flagged=false;
        }
        cell.opened=false;
        cell.value="";
        return cell;
      });
    });
    setGrid(newGrid);
    startGame();
  }

  return (
    <div id='container'>
      <div id="menu">
        <Button onClick={reset}/>
        <Counter flags={bombsLeft}/>
      </div>
      <br/>
      {
        grid.map((row, index) => (
          <div className='row'>
            <Row row={row} rowIndex={index} handleClick={handleClick} flagCell={flagCell} />
          </div>
        ))
      }
    </div>
  )
}
