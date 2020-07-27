import { cloneDeep } from 'lodash';

function makeInitGrid(gridSize: number) {
  const initGrid = new Array(gridSize);

  for (let i = 0; i < gridSize; i += 1) {
    initGrid[i] = new Array(gridSize);
  }

  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      initGrid[i][j] = {
        bomb: false,
        flagged: false,
        value: '',
        adjacentBombs: 0,
        opened: false,
      };
    }
  }

  return initGrid;
}

function checkAdjacentCells(grid, row: number, cell: number): number {
  let bombCount = 0;

  if (grid[row][cell].bomb === true) return -1;

  if (row > 0 && cell > 0) {
    if (grid[row - 1][cell - 1].bomb === true) bombCount += 1;
  }
  if (row > 0) {
    if (grid[row - 1][cell].bomb === true) bombCount += 1;
  }
  if (cell > 0) {
    if (grid[row][cell - 1].bomb === true) bombCount += 1;
  }
  if (row < grid.length - 1) {
    if (grid[row + 1][cell].bomb === true) bombCount += 1;
  }
  if (cell < grid.length - 1) {
    if (grid[row][cell + 1].bomb === true) bombCount += 1;
  }
  if (row < grid.length - 1 && cell < grid.length - 1) {
    if (grid[row + 1][cell + 1].bomb === true) bombCount += 1;
  }
  if (row > 0 && cell < grid.length - 1) {
    if (grid[row - 1][cell + 1].bomb === true) bombCount += 1;
  }
  if (row < grid.length - 1 && cell > 0) {
    if (grid[row + 1][cell - 1].bomb === true) bombCount += 1;
  }

  return bombCount;
}

function placeBombsOnGrid(grid, bombsLeft: number) {
  const gridClone = cloneDeep(grid);
  const size = grid.length;

  for (let i = 0; i < bombsLeft; i += 1) {
    let bombPlaced = false;

    while (!bombPlaced) {
      const row = Math.floor(Math.random() * Math.floor(size));
      const col = Math.floor(Math.random() * Math.floor(size));
      if (gridClone[row][col].bomb === false) {
        gridClone[row][col].bomb = true;
        bombPlaced = true;
      }
    }
  }

  return gridClone;
}

function calcAdjacentBombValues(grid) {
  const gridClone = cloneDeep(grid);

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      gridClone[row][col].adjacentBombs = checkAdjacentCells(grid, row, col);
    }
  }

  return gridClone;
}

export default {
  makeInitGrid,
  checkAdjacentCells,
  placeBombsOnGrid,
  calcAdjacentBombValues,
};
