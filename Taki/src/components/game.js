import React from 'react';
import ReactDOM from 'react-dom';

import BoardComp from './board';
import StatusBarComp from './status_bar';
import ChangeColorComp from './change_color';
import GameFactory from '../models/game_factory';

import '../style.css';


export default class GameComp extends React.Component {
	constructor(props) {
		super(...props);
		
		this.state = {
			game: props.game
		};

		this.cardClicked = this.cardClicked.bind(this);
		this.colorChosen = this.colorChosen.bind(this);
		this.pullCard = this.pullCard.bind(this);
		this.sleep = this.sleep.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.updateStatistics = this.updateStatistics.bind(this);
	}

	pullCard() {
		const { game } = this.state;

		res = game.pullCard();
		if (res == true) {
			nextTurn()
		} else {
			document.getElementById("message").innerHTML = game.message;
		}
	}


	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	nextTurn() {
		const { game } = this.state;
		// updateGameView();
		game.nextTurn();
		this.setState(this.state);
		// updateGameView();
	}

	updateStatistics() {
		const { game } = this.state;

		// document.getElementById('turns-count').innerHTML = "Turns Count: " + game.statistics.turnsCount;
		// document.getElementById('game-duration').innerHTML = "Game Duration: " + miliSecondsToTimeString(game.statistics.getGameDuration());
		// document.getElementById('turn-average').innerHTML = "Turn Average Duration: " + miliSecondsToTimeString(game.players[game.currentPlayerIndex].statistics.avgTurnsDurationsCurrentGame);
		// document.getElementById('turn-average-all-games').innerHTML = "Turn Average Duration All Games: " + miliSecondsToTimeString(game.players[game.currentPlayerIndex].statistics.avgTurnsDurationsAllGames);
		// document.getElementById('single-card-count').innerHTML = "Single Card Count: " + game.players[game.currentPlayerIndex].statistics.singleCardCount;

		playerStatsTable = document.getElementById("players-statistics-table")
		playerStatsTable.innerHTML = "";

		for (var i = 0; i < game.players.length; i++) {
			player = game.players[i]
			var avg = miliSecondsToTimeString(player.statistics.avgTurnsDurationsCurrentGame)
			var singleCount = player.statistics.singleCardCount

			var row = playerStatsTable.insertRow(i);

			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);

			cell1.innerHTML = i;
			cell2.innerHTML = avg;
			cell3.innerHTML = singleCount;
		}

		playerStatsTable.insertRow(0).innerHTML = "<tr><th>Player</th><th>Avg turn duration</th><th>Single card occasions</th></tr>"
	}

	cardClicked(cardState) {
		const { player, card, cardKey, playerKey } = cardState;
		const game = this.state.game;

		var args = {};
		args.card = card;
		args.player = player;
		args.game = game;

		var res = game.play(card, cardKey, playerKey);
		this.nextTurn();
		this.setState(this.state);
	}


	colorChosen(color, card, player) {
		const { game } = this.state;

		game.turn(function(args) {
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
				<StatusBarComp game={game} className="status-bar"/>
				<BoardComp
				 game={game}
				 cardClicked={this.cardClicked}
				 colorChosen={this.colorChosen}/>
				<ChangeColorComp game={game}/>
			</div>);
	}

}