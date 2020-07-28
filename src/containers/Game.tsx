/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import { find } from 'lodash';

import Row from '../components/Row';
import Button from '../components/Button';
import Counter from '../components/Counter';
import LevelSelect from '../components/LevelSelect';

import minesweeper from '../utils/minesweeper';

const { makeInitGrid, placeBombsOnGrid, calcAdjacentBombValues } = minesweeper;

function calcOpenCell(rowIndex: number, cellIndex: number, grid) {

  const newGrid = grid.map((row, index) => {
    if (index !== rowIndex) return row;
    return row.map((cell, index) => {
      if (index !== cellIndex) return cell;
      if (cell.bomb===true) return cell;
      if (cell.adjacentBombs==0) {
        grid[rowIndex][cellIndex].opened=true;
        if (rowIndex>0 && cellIndex>0) calcOpenCell(rowIndex-1, cellIndex-1, grid);
        if (rowIndex>0) calcOpenCell(rowIndex-1, cellIndex, grid);
        if (cellIndex>0) calcOpenCell(rowIndex, cellIndex-1, grid);
        if (rowIndex<grid.length-1) calcOpenCell(rowIndex+1, cellIndex, grid);
        if (cellIndex<grid.length-1) calcOpenCell(rowIndex, cellIndex+1, grid);
        if (rowIndex<grid.length-1 && cellIndex<grid.length-1) calcOpenCell(rowIndex+1, cellIndex+1, grid);            
        if (rowIndex>0 && cellIndex<grid.length-1) calcOpenCell(rowIndex-1, cellIndex+1, grid);
        if (rowIndex<grid.length-1 && cellIndex>0) calcOpenCell(rowIndex+1, cellIndex-1, grid);
      } else {
        grid[rowIndex][cellIndex].opened=true;
        cell.value=cell.adjacentBombs.toString();
      }
      return cell;
    })
  });
  
  return newGrid;
}

export default function Game() {
  const [bombsLeft, setBombsLeft] = useState(5);
  const [bombsNumber, setBombsNumber] = useState(5);
  const [gridSize, setGridSize] = useState(8);
  const [difficulty, setDifficulty] = useState(1);
  const [grid, setGrid] = useState(null);

  const difficultyValues = [{
    difficulty: 1,
    bombCount: 5,
    size: 8,
  }, {
    difficulty: 2,
    bombCount: 20,
    size: 12,
  }, {
    difficulty: 3,
    bombCount: 40,
    size: 16,
  }];

  function prepareGrid(size: number, bombCount: number) {
    const initializedGrid = makeInitGrid(size);
    const bombedGrid = placeBombsOnGrid(initializedGrid, bombCount);
    const preparedGrid = calcAdjacentBombValues(bombedGrid);
    return preparedGrid;
  }

  function startGame() {
    const { size, bombCount } = find(difficultyValues, ['difficulty', difficulty]);

    setGridSize(size);
    setBombsLeft(bombCount);
    setBombsNumber(bombCount);
    setGrid(prepareGrid(size, bombCount));
  }

  function exposeGrid() {
    const newGrid = grid.map((row) => row.map((cell) => {
      const cellClone = { ...cell };
      cellClone.opened = true;
      if (cell.bomb === true) {
        cellClone.value = 'BOMB!';
      } else if (cell.adjacentBombs === 0) {
        cellClone.value = '';
      } else {
        cellClone.value = cell.adjacentBombs.toString();
      }
      return cellClone;
    }));

    setGrid(newGrid);
  }

  function checkIfGameOver() {
    let over = true;
    grid.map((row, index) => {
      row.map((cell, index) => {
        if (cell.flagged===false && cell.opened===false) over = false;  
      });
    });
    
    return over;;
  }

  function gameOver() {
    exposeGrid();
    alert('You suck!');
  }

  function handleClick(rowIndex: number, cellIndex: number) {

    if (grid[rowIndex][cellIndex].opened==true) return;
    if (grid[rowIndex][cellIndex].bomb==true) gameOver();
    else {
      //const newGrid = calcOpenCell(rowIndex, cellIndex, grid);
      
      const newGrid = grid.map((row, index) => {
        if (index !== rowIndex) return row;
        return row.map((cell, index) => {
          if (index !== cellIndex) return cell;
          if (cell.bomb===true) return cell;
          if (cell.adjacentBombs==0) {
            cell.opened=true;
            if (rowIndex>0 && cellIndex>0) handleClick(rowIndex-1, cellIndex-1, grid);
            if (rowIndex>0) handleClick(rowIndex-1, cellIndex, grid);
            if (cellIndex>0) handleClick(rowIndex, cellIndex-1, grid);
            if (rowIndex<grid.length-1) handleClick(rowIndex+1, cellIndex, grid);
            if (cellIndex<grid.length-1) handleClick(rowIndex, cellIndex+1, grid);
            if (rowIndex<grid.length-1 && cellIndex<grid.length-1) handleClick(rowIndex+1, cellIndex+1, grid);            
            if (rowIndex>0 && cellIndex<grid.length-1) handleClick(rowIndex-1, cellIndex+1, grid);
            if (rowIndex<grid.length-1 && cellIndex>0) handleClick(rowIndex+1, cellIndex-1, grid);
          } else {
            cell.opened=true;
            cell.value=cell.adjacentBombs.toString();
          }
          return cell;
        })
      });
      

      setGrid(newGrid);

      //if (checkIfGameOver()==true) alert("You won!");
    }

  }


  function flagCell(rowIndex: number, cellIndex: number) {
     // flag cell, bombcount down
     const newGrid = grid.map((row, index) => {
       if (index !== rowIndex) return row;
       return row.map((cell, index) => {
         if (index !== cellIndex) return cell;

         if (cell.opened===true) return cell;
         if (cell.flagged === true) {
           setBombsLeft(bombsLeft + 1);
           cell.value = '';
           cell.flagged = false;
         } else if (bombsLeft == 0) {
           return cell;
         } else {
           setBombsLeft(bombsLeft - 1);
           cell.value = 'FLAG';
           cell.flagged = true;
        }
         return cell;
       });
     });
     setGrid(newGrid);
     if (checkIfGameOver() === true) alert('you won!');
  }

  function detectShift(rowIndex, cellIndex, e) {
    if (e.shiftKey) {
      flagCell(rowIndex, cellIndex);
    } else {
      handleClick(rowIndex, cellIndex);
    }
  }

  useEffect(startGame, [difficulty]);

  return (
    <div id="container">
      <div id="menu">
        <Button onClick={startGame} />
        <Counter flags={bombsLeft} />
        <LevelSelect onClick={setDifficulty} />
      </div>
      <br />
      {
        grid && grid.map((row:number, index:number) => (
          <div className="row">
            <Row row={row} rowIndex={index} detectShift={detectShift} />
          </div>
        ))
      }
    </div>
  );
}
