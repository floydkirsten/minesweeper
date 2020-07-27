import React, { useState } from 'react';

import Row from '../components/Row';
import Button from '../components/Button';
import Counter from '../components/Counter';

export default function Game() {

  const [bombsLeft, setBombsLeft] = useState(1);
  const [size, setSize] = useState(2);

  function makeInitGrid(size) {
    var initGrid=new Array(size);
    for(var i=0;i<size;i++) {
      initGrid[i]=new Array(size);
    }
    for (var i=0;i<size;i++) {
      for(var j=0;j<size;j++) {
        initGrid[i][j] = {
          bomb: false,
          flagged: false, 
          value: '',
          adjacentBombs: 0,
          opened: false
        }
      }
    }
    return initGrid;
  }

  const [grid, setGrid] = useState(makeInitGrid(size));
    
  function startGame() {
    for (var i=0;i<bombsLeft;i++) {
      var bomb=true;
      while(bomb) {
        var row = Math.floor(Math.random() * Math.floor(size));
        var col = Math.floor(Math.random() * Math.floor(size));
        if (grid[row][col].bomb==false) {
          grid[row][col].bomb=true;
          bomb = false;
        }
      }
    }

    for (var row=0;row<grid.length;row++) {
      for (var col=0;col<grid[0].length;col++) {
        checkAdjacent(row, col);
      }
    }
  }

  function handleClick(rowIndex: number, cellIndex: number, loop: boolean) {
    if (grid[rowIndex][cellIndex].opened==true) {
    } else if(grid[rowIndex][cellIndex].bomb==true && !loop) {
      explode();
    } else {
      const newGrid = grid.map((row, index) => {
        if (index !== rowIndex) return row;
        return row.map((cell, index) => {
          if (index !== cellIndex) return cell;
          if (cell.adjacentBombs==0) {
            grid[rowIndex][cellIndex].opened=true;
            if (rowIndex>0 && cellIndex>0) handleClick(rowIndex-1, cellIndex-1, true);
            if (rowIndex>0) handleClick(rowIndex-1, cellIndex, true);
            if (cellIndex>0) handleClick(rowIndex, cellIndex-1, true);
            if (rowIndex<grid.length-1) handleClick(rowIndex+1, cellIndex, true);
            if (cellIndex<grid.length-1) handleClick(rowIndex, cellIndex+1, true);
            if (rowIndex<grid.length-1 && cellIndex<grid.length-1) handleClick(rowIndex+1, cellIndex+1, true);            
            if (rowIndex>0 && cellIndex<grid.length-1) handleClick(rowIndex-1, cellIndex+1, true);
            if (rowIndex<grid.length-1 && cellIndex>0) handleClick(rowIndex+1, cellIndex-1, true);
          } else {
            grid[rowIndex][cellIndex].opened=true;
            cell.value=cell.adjacentBombs.toString();
          }
          return cell;
        })
      });
      setGrid(newGrid);
      if (isGameOver()==true) alert("You won!");
    }
    console.log(grid);
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
  
  }

  function isGameOver() {
    var gameOver=true;
    grid.map((row, index) => {
      row.map((cell, index) => {
        if (cell.flagged==false && cell.opened==false) gameOver=false; 
      });
    });
    return gameOver;
  }

  function flagCell(rowIndex: number, cellIndex: number) {
    //flag cell, bombcount down
    const newGrid = grid.map((row, index) => {
      if (index !== rowIndex) return row;
      return row.map((cell, index) => {
        if (index !== cellIndex) return cell;
        if (cell.flagged==true) {
          setBombsLeft(bombsLeft+1);
          cell.value=""
          cell.flagged = !cell.flagged;
        } else if (cell.opened==true) {
        } else {
          if (bombsLeft==0) {
          } else {
            setBombsLeft(bombsLeft-1);
          cell.value="FLAG";
          cell.flagged = !cell.flagged;
          }
        }
        return cell;
      });
    });
    setGrid(newGrid);
    if (isGameOver()==true) alert("you won!");
  }

  function reset() {
    //start new game
    setBombsLeft(1);
    const newGrid = grid.map((row, index) => {
      return row.map((cell, index) => {
        cell.flagged=false;
        cell.opened=false;
        cell.value="";
        cell.bomb=false;
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
