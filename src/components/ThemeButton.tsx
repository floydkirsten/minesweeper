import React from 'react';

export default function ThemeButton({onClick, theme}: any) {
    return (
        <button onClick={onClick} 
        style={{
            width: 90, 
            fontSize: 10, 
            height: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme==="pink"?'mistyrose':'white'
        }}> change theme </button>
    )
}