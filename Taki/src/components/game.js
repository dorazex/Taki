import React from 'react';
import ReactDOM from 'react-dom';

import BoardComp from './board';
import StatusBarComp from './status_bar';
import ChangeColorComp from './change_color';
import GameFactory from '../models/game_factory';

import '../style.css';


export default class GameComp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			game: props.game
		};

		this.cardClicked = this.cardClicked.bind(this);
		this.colorChosen = this.colorChosen.bind(this);
		this.finishTurn = this.finishTurn.bind(this);
		this.pullCard = this.pullCard.bind(this);
	}


	componentDidMount() {
		this.nextTurn();
	}

	componentWillUnmount() {
		//TODO
	}

	pullCard() {
		const game = this.state.game;
		const res = game.pullCard();
		this.setState(this.state);
		if (res == true)
			this.nextTurn();
	}

	cardClicked(card, cardKey, playerKey) {
		const game = this.state.game;
		var res = game.play(card, cardKey, playerKey);
		this.setState(this.state);
		this.nextTurn();
	}

	finishTurn() {
		const game = this.state.game;
		game.finishTurn();
		this.setState(this.state);
		this.nextTurn();
	}

	//TODO sleep
	// sleep(ms) {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }

	nextTurn() {
		const game = this.state.game;

		var playerIndex = game.currentPlayerIndex;
		var currentPlayer = game.players[playerIndex];

		// now computers play their turns, updating the game view after each turn
		while (currentPlayer.isComputerPlayer == true) {
			game.computerPlay();  	// computer calculates the actual turn
			this.setState(this.state);
			playerIndex = game.currentPlayerIndex;
			currentPlayer = game.players[playerIndex];
		}
	}

	colorChosen(color, card, player) {
		const { game } = this.state;

		game.turn(function (args) {
			const { game, card, player } = args;

			player.putCard(game.heap, card);
			game.heap.currentColor = color.toUpperCase();

			var step = { card, color, player };
			return { updateTurnInfo: true, moveNextPlayer: true, step };
		}, { game, color, card, player });
	}

	render() {
		const { game } = this.props;

		return (
			<div>
				<StatusBarComp game={game} className="status-bar" />
				<BoardComp
					game={game}
					cardClicked={this.cardClicked}
					colorChosen={this.colorChosen}
					finishTurn={this.finishTurn}
					pullCard={this.pullCard} />
				<ChangeColorComp game={game} />
			</div>);
	}
}