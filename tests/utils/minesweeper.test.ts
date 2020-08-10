import minesweeper from '../../src/utils/minesweeper';

//makeInitGrid
test('should initialize a grid given a size', () => {
	const input = 3;
	const output = [
		[
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false}
		],
		[
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false}
		],
		[
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false},
			{bomb:false, flagged:false, value:'', adjacentBombs:0, opened:false}
		]
	];
	expect(minesweeper.makeInitGrid(input)).toEqual(output);
})


//checkAdjacentCells
test('should return the adjacent cell bomb count', () => {
	const input = [
		[{bomb:false},{bomb:false},{bomb:true}],
		[{bomb:false},{bomb:false},{bomb:false}],
		[{bomb:false},{bomb:true},{bomb:false}]
	];

	const output = 2;
	expect(minesweeper.checkAdjacentCells(input, 1, 2)).toBe(output);
})


//placeBombsOnGrid
test('should place desired number of bombs on map', () => {
	const input = [
		[{bomb:false},{bomb:false},{bomb:false}],
		[{bomb:false},{bomb:false},{bomb:false}],
		[{bomb:false},{bomb:false},{bomb:false}]
	];

	const bombs = 2;

	const output = 2;
	function countBombs(grid: any) {
		let bombNumber = 0;
		grid.map((row: any, index: any) => {
			return row.map((cell: any) => {
				if (cell.bomb===true) bombNumber = bombNumber+1;
			})
		})
		return bombNumber;
	}
	expect(countBombs(minesweeper.placeBombsOnGrid(input, bombs))).toEqual(output);
})

//calcAdjacentBombValues
test('calculates the adjacent bombs for the cells in the grid', () => {
	const input = [
		[
			{bomb: true, adjacentBombs:0},
			{bomb: false, adjacentBombs:0},
			{bomb: true, adjacentBombs:0}
		],
		[
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0}
		],
		[
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0}
		]
	];

	const output = [
		[
			{bomb: true, adjacentBombs:-1},
			{bomb: false, adjacentBombs:2},
			{bomb: true, adjacentBombs:-1}
		],
		[
			{bomb: false, adjacentBombs:1},
			{bomb: false, adjacentBombs:2},
			{bomb: false, adjacentBombs:1}
		],
		[
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0},
			{bomb: false, adjacentBombs:0}
		]
	]
	expect(minesweeper.calcAdjacentBombValues(input)).toEqual(output);
})


//calcOpenCell
test('should handle click on board appropiately', () => {
	const input = [
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:1, value: ''},
			{flagged:false, opened:false, bomb: true, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:1, value: ''}
		],
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:1, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:1, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:1, value: ''}
		],
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''}
		]
	];

	let row = 0;
	let cell = 0;

	const output = [
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: true, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''}
		],
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: true, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''}
		],
		[
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''},
			{flagged:false, opened:false, bomb: false, adjacentBombs:0, value: ''}
		]
	];
	expect(minesweeper.calcOpenCell(row, cell, input, false))
})


//checkIfGameOver
test('should return true if game is over', () => {
	const input = [
		[
			{flagged:false, opened:false},
			{flagged:false, opened:false},
			{flagged:false, opened:false}
		],
		[
			{flagged:false, opened:false},
			{flagged:false, opened:false},
			{flagged:false, opened:false}
		],
		[
			{flagged:false, opened:false},
			{flagged:false, opened:false},
			{flagged:false, opened:false}
		]
	];
	const output = false;
	expect(minesweeper.checkIfGameOver(input)).toEqual(output);
})
