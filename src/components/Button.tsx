import React from 'react';

export default function Button({onClick}: any) {
    return (
        <button onClick={onClick} style={{width: 60, fontSize: 15, height: 50}}> reset </button>
    )
}