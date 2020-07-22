import React from 'react';
import { MineField } from './MineField';
import { useState, useEffect, MouseEvent } from 'react';
import { MineMenu } from './MineMenu';

/* interface GameProps {
    size: 8,
    mines: 10
}
*/

const grid = [
    {
        index: 0,
        name: "test1"
    },
    {
        index: 2,
        name: "test2"
    },
    {
        index: 3,
        name: "test3"
    }
]


function MineGame(){
    
    return (
        <div>
            <MineMenu />
            <MineField grid={grid}/>
        </div>
        
    )
}

export { MineGame };