import React from 'react';

/* interface SquareProps {
    coords: number[]
    id: number
    flagged: boolean;
    value: number;
    revealed: boolean
    mine: boolean
} */


/* const cells = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    }
]
*/

/* for (var i=0;i<8;i++) {
    for (var j=0; j<8;j++) {
        Coords[i][j] = MineSquare;
    }
} */

interface TileProperties {
    name: String,
    index: Number
}


function MineSquare({name, index}: TileProperties) {
    return (
        <div id="mine">
            {name}
        </div>
    )
}

/* const getCoords = ( 
    arr: Coords[],
    size: number,
    banned?: Coords
): Coords => {
    const coords: Coords = {
        x: chance.integer({ min: 0, max: 7}),
        y: chance.integer({ min: 0, max: 7})
    };
    const strArr = arr.map(coord => JSON.stringify(coord));
    if (banned) {
        return strArr.includes(JSON.stringify(coords)) || adjacent(coords, banned)
            ? getCoords(arr, 8, banned)
            : coords;
    } else {
        return strArr.includes(JSON.stringify(coords))
        ? getCoords(arr, 8, banned)
        : coords;
    }
}; */

export { MineSquare };