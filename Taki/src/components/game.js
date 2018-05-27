import React from 'react';
import ReactDOM from 'react-dom';

import BoardComp from './board';
import StatusBarComp from './status_bar';
import GameFactory from '../models/game_factory';


export default class GameComp extends React.Component {
	constructor(props) {
		super(...props);
		this.state = {
			game: props.game
		};
		this.activeCardOnClick = this.activeCardOnClick.bind(this);
		this.activeChangeColor = this.activeChangeColor.bind(this);
	}

	activeCardOnClick(cardIndex, playerIndex) {
		const card = this.state.game.players[playerIndex].cards[cardIndex];
		this.state.game.play(card, cardIndex, playerIndex);
	};

	activeChangeColor(cardIndex, playerIndex) {
		let card = this.state.game.players[playerIndex].cards[cardIndex];
		let res = this.state.game.changeColor(card, cardIndex, playerIndex);
		if (res == true);
		//document.getElementById('change-color-modal').style.display = "block";
	}

	pullCard() {
		res = this.state.game.pullCard();
		if (res == true) {
			nextTurn()
		} else {
			document.getElementById("message").innerHTML = window.game.message;
		}
	}


	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	nextTurn() {
		//updateGameView();

		let playerIndex = this.state.game.currentPlayerIndex;
		let currentPlayer = this.state.game.players[playerIndex];

		// now computers play their turns, updating the game view after each turn
		while (currentPlayer.isComputerPlayer == true) {
			this.state.game.computerPlay();  	// computer calculates the actual turn 
			// await sleep(3000);
			//updateGameView();
			playerIndex = this.stategame.currentPlayerIndex;
			currentPlayer = this.state.game.players[playerIndex];
		}
	}

	render() {
		const { game } = this.state;
	
		return (
			<div>
				<BoardComp game={game}/>
			</div>);
	}

}