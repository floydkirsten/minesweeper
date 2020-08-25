/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export default function Level({ onClick, theme }:any) {
  return (
    <div id="level">
      <div style={{color: theme==='pink'? "palevioletred": 'white', paddingBottom: 5}}>
        Select Level:
      </div>
      <div id="buttons" >
        <button style={{backgroundColor: theme==="pink"?'mistyrose':'white'}} onClick={() => onClick(1)}> easy </button>   
        <button style={{backgroundColor: theme==="pink"?'mistyrose':'white'}} onClick={() => onClick(2)}> medium </button>
        <button style={{backgroundColor: theme==="pink"?'mistyrose':'white'}} onClick={() => onClick(3)}> hard </button>
      </div>
    </div>

  );
}
