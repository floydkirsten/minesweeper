import React from 'react';

interface CounterProps {
    bombCount: number;
}

function Counter({bombCount}: CounterProps) {
    return(
        <div id='counter'> {bombCount} </div>
    )
}

export { Counter };