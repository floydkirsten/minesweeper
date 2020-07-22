import React from 'react';
import { Counter } from './MineCounter';
import { useState } from 'react';
import { ResetButton } from './ResetButton'

function MineMenu() {
    
    const [bombCount, setBombCount] = useState(10);

    function reset() {
        setBombCount(10);
        //alert('hello')
    }

    function lower() {
        setBombCount(bombCount - 1);
    }

    return (
        <div id='menu'> 
            <ResetButton onClick={reset}/>
            <ResetButton onClick={lower}/>
            <Counter bombCount={bombCount}/>  
        </div>
    )
}

export { MineMenu };