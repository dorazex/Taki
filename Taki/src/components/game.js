import React from 'react';
import ReactDOM from 'react-dom';

import BoardComp from './board';
import StatusBarComp from './status_bar';
import ChangeColorComp from './change_color';
import EndGameStatisticsComp from './end_game_statistics';
// import GameFactory from './models/game_factory';
import DecksComp from './decks';

import '../style.css';


export default class GameComp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showColorModal: false,
			showEndModal: false,
		};

		this.cardClicked = this.cardClicked.bind(this);
		this.colorChosen = this.colorChosen.bind(this);
		this.finishTurn = this.finishTurn.bind(this);
		this.pullCard = this.pullCard.bind(this);
		this.hideColorModal = this.hideColorModal.bind(this);
		this.showEndModal = this.showEndModal.bind(this);
		this.hideEndModal = this.hideEndModal.bind(this);
		this.newGame = this.newGame.bind(this);
		this.withdraw = this.withdraw.bind(this);
		//this.checkIfGameStarted = this.checkIfGameStarted.bind(this);



		//this.checkGameStartInterval = setInterval(this.checkIfGameStarted, 1000);
	}




	// checkIfGameStarted() {
	// 	fetch('/game/checkGameStart', {
	// 		method: 'GET',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		credentials: 'include'
	// 	})
	// 		.then((response) => {
	// 			if (response.status === 200) {
	// 				return response.json();
	// 			}
	// 		})
	// 		.then((res) => {
	// 			this.setState(() => ({ playersList: res.players }));
	// 			if (res.gameRunning == true) {
	// 				showMessage("Nonogram", "Game started");
	// 				$("#sidePanel *").removeClass('disabled').prop('disabled', false);
	// 				blinkTitleWithMessage("Game started");
	// 				clearInterval(checkGameStartInterval);
	// 				this.updateDetailsInterval = setInterval(this.updateDetails, 1000); // relevant to player, not spectator
	// 			}
	// 		});
	// }


	newGame() {
		this.state.game.newGame();
		this.setState({ showEndModal: false });
	}

	withdraw() {
		this.state.game.winnerIndex = 0;
		this.showEndModal();
	}

	showEndModal() {
		this.setState({ showEndModal: true });
	};

	hideEndModal() {
		this.state.game.ended = true;
		this.setState({ showEndModal: false });
	};


	finishTurn() {
		fetch('/game/finishTurn', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState(this.state);
				}
			})
	}

	pullCard() {
		fetch('/game/pullCard', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState(this.state);
				}
			})
	}


	cardClicked(card, cardKey, playerKey) {
		fetch('/game/cardClicked', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ card: card, cardKey: cardKey, playerKey: playerKey }),
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState(this.state);
				}
			})
	}

	colorChosen(card, cardKey, playerKey) {
		fetch('/game/colorChosen', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ card: card, cardKey: cardKey, playerKey: playerKey }),
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState({ showColorModal: true });
				}
			})
	}

	hideColorModal(color) {
		fetch('/game/changeColor', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ color: color }),
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					this.setState({ showColorModal: false });
				}
			})
	}

	render() {
		//	const winnerIndex = game.winnerIndex;
		//	const showEndModal = winnerIndex != undefined ? true : this.state.showEndModal;

		return (
			<div>
				<StatusBarComp withdraw={this.withdraw} className="status-bar" />
				<BoardComp username={this.props.username} cardClicked={this.cardClicked} colorChosen={this.colorChosen} finishTurn={this.finishTurn} pullCard={this.pullCard} />
				<ChangeColorComp show={this.state.showColorModal} handleClose={this.hideColorModal} />
			</div>
		)

		// <div id={game.ended ? "main-div" : ""}>
		// 


		// 	<EndGameStatisticsComp show={showEndModal} handleClose={this.hideEndModal} game={game} newGame={this.newGame} />
		// </div >);
	}
}