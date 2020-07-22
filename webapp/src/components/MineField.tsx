import React from 'react';
import { MineSquare } from './MineSquare'

interface FieldProps {
    grid: []
}


function MineField({grid}: FieldProps) {

    return (
        <div>
            {grid.map(tile => {
                return (
                    <MineSquare name={tile.name} index={tile.index} />
                );
            })}   
        </div>

    )
}



export { MineField };