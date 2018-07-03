import React from 'react';
import ReactDOM from 'react-dom';
import GameComp from './components/game';
import Game from './models/game';
import GameFactory from './models/game_factory';
import BaseContainer from './components/baseContainer.js';
import "./style.css";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BaseContainer />,
  document.getElementById("root")
  //<div>
  //  <GameComp game={GameFactory.createGameOneOnOne()} />
  //</div>,
  // document.getElementById("root")
);

