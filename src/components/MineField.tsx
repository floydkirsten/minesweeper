import React from 'react';
import { MineSquare } from './MineSquare'

function MineField({}) {
    return (
    <div id="board">        
        <MineSquare />
        <MineSquare />
        <MineSquare />
    </div>
    );
}



export { MineField };