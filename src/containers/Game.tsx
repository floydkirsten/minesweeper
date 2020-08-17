/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';

import { find } from 'lodash';

import Button from '../components/Button';
import Counter from '../components/Counter';
import LevelSelect from '../components/LevelSelect';
import Row from '../components/Row';
import Rules from '../components/Rules';
import ThemeButton from "../components/ThemeButton";
import Timer from '../components/Timer';
import Title from '../components/Title';

import minesweeper from '../utils/minesweeper';

const { checkIfGameOver, calcOpenCell, difficultyValues, prepareGrid } = minesweeper;

export default function Game() {
  const [bombsLeft, setBombsLeft] = useState(5);
  const [bombsNumber, setBombsNumber] = useState(5);
  const [gridSize, setGridSize] = useState(8);
  const [difficulty, setDifficulty] = useState(1);
  const [grid, setGrid] = useState(null);
  const [active, setActive] = useState(true);
  const [time, setTime] = useState(0);
  const [clicks, setClicks] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [theme, setTheme] = useState("pink");

  function startGame() {
    const { size, bombCount }: any = find(difficultyValues, ['difficulty', difficulty]);
    setGridSize(size);
    setBombsLeft(bombCount);
    setBombsNumber(bombCount);
    setGrid(prepareGrid(size, bombCount));
    setActive(true);
    setTime(0);
    setClicks(1);
    setTimerActive(false);
  }

  function exposeGrid() {
    const newGrid = grid.map((row: any[]) => row.map((cell) => {
      cell.opened = true;
      if (cell.bomb === true) {
        cell.value = '😔';
      } else if (cell.adjacentBombs === 0) {
        cell.value = '';
      } else {
        cell.value = cell.adjacentBombs.toString();
      }
      return cell;
    }));
    setActive(false);
    setTimerActive(false);
    setGrid(newGrid);
  }

  function gameOver() {
    exposeGrid();
    alert('You suck!');
  }

  function handleClick(rowIndex: number, cellIndex: number) {
    if (clicks===1) {
      setTimerActive(true);
    }
    if (grid[rowIndex][cellIndex].bomb===true) gameOver();
    if (grid[rowIndex][cellIndex].opened===true) return;
    
    let newGrid = calcOpenCell(rowIndex, cellIndex, grid, false);

    setGrid(newGrid);

    if (checkIfGameOver(grid)==true) {
      setActive(false)
      setTimerActive(false);
      alert("you won!")
    }
  }
  
  function flagCell(rowIndex: number, cellIndex: number) {
     const newGrid = grid.map((row: any[], index: number) => {
       if (index !== rowIndex) return row;
       return row.map((cell: { opened: boolean; flagged: boolean; value: string; }, index: number) => {
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
           cell.value = '🌸';
           cell.flagged = true;
        }
         return cell;
       });
     });
     setGrid(newGrid);
     if (checkIfGameOver(grid) === true) {
       setActive(false);
       setTimerActive(false);
       alert('you won!');
     }
  }

  useEffect(() => {
    let interval: any = null;
    if(timerActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!timerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, time]);

  function detectShift(rowIndex: number, cellIndex: number, e: { shiftKey: any; preventDefault: () => void; }) { 
    if (active === false) return;
    if (e.shiftKey) {
      e.preventDefault();
      flagCell(rowIndex, cellIndex);
    } else {
      setClicks(clicks+1);
      handleClick(rowIndex, cellIndex);
    }
  }

  function switchTheme() {
    if (theme==="pink") {
      setTheme("dark");
    } else {
      setTheme("pink");
    }
  }

  useEffect(startGame, [difficulty]);

  return (
    <div id={theme==="pink"?'pinkContainer':'darkContainer'}>
      <Title theme={theme}/>
      <div id="menu">
        <Timer time={time} />
        <Button onClick={startGame} />
        <Counter flags={bombsLeft} />
        <LevelSelect onClick={setDifficulty} />
        <ThemeButton onClick={switchTheme} />
      </div>
      <br />
      <div id="board">
      {
        grid && grid.map((row:number, index:number) => (
          <div className="row">
            <Row row={row} rowIndex={index} detectShift={detectShift} />
          </div>
        ))
      }
      </div>
      <Rules />
    </div>
  );
}

export function addAB(a: number, b: number) {
  return a + b;
}