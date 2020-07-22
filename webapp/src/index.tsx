import React from 'react';
import { render } from 'react-dom';
import { MineField } from './components/MineField'
import { MineGame } from './components/MineGame'

const Application: React.SFC<{}> = () => (
    <div> 
        <MineGame/> 
    </div>
);

render(<Application />, document.getElementById('root'));
