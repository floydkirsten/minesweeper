import React from 'react';

export default function Button({onClick, theme}: any) {
    return (
        <button onClick={onClick} 
        style={{
            width: 60, 
            fontSize: 15, 
            height: 50, 
            backgroundColor: theme==="pink"?'mistyrose':'white'
        }}> reset </button>
    )
}