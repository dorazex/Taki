import React from 'react';
import ReactDOM from 'react-dom';
import GameComp from './components/game';
import Game from './models/game';
import GameFactory from './models/game_factory';
import "./style.css";

ReactDOM.render(
    <GameComp game={GameFactory.createGameOneOnOne()} />,
    // React.createElement('div',null, 'hello world'),
    document.getElementById("root")
);



