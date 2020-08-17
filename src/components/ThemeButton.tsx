import React from 'react';

export default function ThemeButton({onClick}: any) {
    return (
        <button onClick={onClick} style={{width: 80, fontSize: 15, height: 50}}> change theme </button>
    )
}