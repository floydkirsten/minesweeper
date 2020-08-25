import React from 'react';

export default function Title({theme}: any) {
    return (
        <div>
            <div style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '50px',
                paddingRight: '20px',
                fontFamily:  'Arial Black, serif',
                color: theme==="pink"?'pink':'white'
                }}> MINESWEEPER </div>
        </div>
    )
}