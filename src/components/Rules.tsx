import React from 'react';

export default function Rules({theme}: any) {
    return (
        <div>
            <div id="rules" style={{color: theme==='pink'? 'maroon': 'lightgray'}}> 
            to set flags: hold down shift and click
            </div>
            <div id="link">
            <a style={{color: theme==='pink'? 'plum': 'white'}} href={"https://github.com/floydkirsten"}> 
            <img src={require('../images/github.png')} />
            github.com/floydkirsten 
            </a>
            </div>
        </div>
    )
}