import React from 'react';

export default function Button({onClick}: any) {
    return (
        <button onClick={onClick} style={{width: 60}}> reset </button>
    )
}