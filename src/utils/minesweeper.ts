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

function checkAdjacentCells(grid: any, row: number, cell: number): number {
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

function placeBombsOnGrid(grid: string | any[], bombsLeft: number) {
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

function prepareGrid(size: number, bombCount: number) {
  const initializedGrid = makeInitGrid(size);
  const bombedGrid = placeBombsOnGrid(initializedGrid, bombCount);
  const preparedGrid = calcAdjacentBombValues(bombedGrid);
  return preparedGrid;
}

function calcAdjacentBombValues(grid: string | any[]) {
  const gridClone = cloneDeep(grid);

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      gridClone[row][col].adjacentBombs = checkAdjacentCells(grid, row, col);
    }
  }

  return gridClone;
}

function calcOpenCell(rowIndex: number, cellIndex: number, grid: any[], loop: boolean) {
  //if (grid[rowIndex][cellIndex].bomb===true && !loop) gameOver();
    if (grid[rowIndex][cellIndex].opened===true) return;

    else {
      const newGrid = grid.map((row: any[], index: number) => {
        if (index !== rowIndex) return row;
        return row.map((cell: { bomb: boolean; adjacentBombs: number; opened: boolean; value: any; }, index: number) => {
          if (index !== cellIndex) return cell;
          if (cell.bomb===true) return cell;

          if (cell.adjacentBombs===0) {
            cell.opened=true;
            if (rowIndex>0 && cellIndex>0) calcOpenCell(rowIndex-1, cellIndex-1, grid, true); //NW
            if (rowIndex>0) calcOpenCell(rowIndex-1, cellIndex, grid, true); //W
            if (cellIndex>0) calcOpenCell(rowIndex, cellIndex-1, grid, true); //N
            if (rowIndex<grid.length-1) calcOpenCell(rowIndex+1, cellIndex, grid, true); //E
            if (cellIndex<grid.length-1) if (cellIndex<grid.length-1) calcOpenCell(rowIndex, cellIndex+1, grid, true); //S
            if (rowIndex<grid.length-1 && cellIndex<grid.length-1) calcOpenCell(rowIndex+1, cellIndex+1, grid, true) //SE           
            if (rowIndex>0 && cellIndex<grid.length-1) calcOpenCell(rowIndex-1, cellIndex+1, grid, true); //NW
            if (rowIndex<grid.length-1 && cellIndex>0) calcOpenCell(rowIndex+1, cellIndex-1, grid, true); //NE
          } else {
            cell.opened=true;
            cell.value=cell.adjacentBombs.toString();
          } 
          return cell;
        });
      });

  return newGrid;
}
}

function checkIfGameOver(grid: any[]) {
  let over = true;
  grid.map((row: any, index: any) => {
    row.map((cell: { flagged: boolean; opened: boolean; }, index: any) => {
      if (cell.flagged===false && cell.opened===false) over = false;  
    });
  });
  return over;
}

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

export default {
  calcOpenCell,
  difficultyValues,
  prepareGrid,
  checkIfGameOver,
  checkAdjacentCells,
  makeInitGrid,
  placeBombsOnGrid,
  calcAdjacentBombValues
};
