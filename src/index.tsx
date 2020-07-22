import React from 'react';
import { render } from 'react-dom';
import Game from './containers/Game';

const Application: React.SFC<{}> = () => <Game />;

render(<Application />, document.getElementById('root'));
