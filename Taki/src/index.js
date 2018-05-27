import React from 'react';
import ReactDOM from 'react-dom';
import GameComponent from './components/game';
import GameCreator from './models/game_creator';
import "./style.css";

ReactDOM.render(
    <GameComponent game={GameCreator.createStandardGame()} />,
    document.getElementById("root")
);



