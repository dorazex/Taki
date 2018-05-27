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
		this.pullCard = this.pullCard.bind(this);
		this.sleep = this.sleep.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
		this.updateStatistics = this.updateStatistics.bind(this);
	}

	activeCardOnClick(cardIndex, playerIndex) {
		const { game } = this.state;
		const card = game.players[playerIndex].cards[cardIndex];

		game.play(card, cardIndex, playerIndex);
	};

	activeChangeColor(cardIndex, playerIndex) {
		const { game } = this.state;

		let card = game.players[playerIndex].cards[cardIndex];
		let res = game.changeColor(card, cardIndex, playerIndex);
		if (res == true);
		//document.getElementById('change-color-modal').style.display = "block";
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
		updateGameView();
		game.nextTurn();
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

	render() {
		const { game } = this.state;

		return (
			<div>
				<StatusBarComp game={game}/>
				<BoardComp game={game}/>
			</div>);
	}

}