/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export default function Level({ onClick }:any) {
  return (
    <div id="level">
      <div style={{color: "lightgray"}}>
        Select Level:
      </div>
      <button onClick={() => onClick(1)}> easy </button>
      <button onClick={() => onClick(2)}> medium </button>
      <button onClick={() => onClick(3)}> hard </button>
    </div>

  );
}
