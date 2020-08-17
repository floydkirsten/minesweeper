import React from 'react';

export default function Title({theme}: any) {
    return (
        <div>
            <div id={theme==="pink"? 'pinkTitle':'darkTitle'}> MINESWEEPER </div>
        </div>
    )
}