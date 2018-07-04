import React from 'react';
import ReactDOM from 'react-dom';

import BoardComp from './board';
import StatusBarComp from './status_bar';
import ChangeColorComp from './change_color';
import EndGameStatisticsComp from './end_game_statistics';
import GameFactory from '../models/game_factory';

import '../style.css';


export default class GameComp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//game: props.game,
			showColorModal: false,
			showEndModal: false,
			playerList: []
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
		//this.updateDetails = this.updateDetails.bind(this);
		this.updatePlayerList = this.updatePlayerList.bind(this);
		this.updatePlayerListInterval = setInterval(this.updatePlayerList, 1000);
		//this.checkGameStartInterval = setInterval(this.checkIfGameStarted, 1000);
	}


	updatePlayerList() {
		fetch('/game/playerList', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((res) => {
				console.log("hereeee");
				this.setState(() => ({ playerList: res.players }));
			});
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

	//componentDidMount() {
	//	this.nextTurn();
	//}

	showColorModal() {
		this.setState({
			game: this.state.game,
			showColorModal: true,
		});
	};

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

	hideColorModal(color) {
		const game = this.state.game;
		game.currentColor = color;
		game.cyclicIncrementCurrentPlayerIndex(false);

		this.setState({
			game: this.state.game,
			showColorModal: false,
		}, () => {
			this.nextTurn();
		});
	};

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

	colorChosen(card, cardKey, playerKey) {
		const game = this.state.game;
		var res = game.changeColor(card, cardKey, playerKey);
		if (res == true)
			this.showColorModal();
	}

	finishTurn() {
		const game = this.state.game;
		game.finishTurn();
		this.setState(this.state);
		this.nextTurn();
	}

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



	render() {
		//	const { game } = this.props;
		//	const winnerIndex = game.winnerIndex;
		//	const showEndModal = winnerIndex != undefined ? true : this.state.showEndModal;

		return (
			<div>
				<StatusBarComp withdraw={this.withdraw} className="status-bar" />
				<div className="players-wrpper">
					<h2>Players</h2>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						<tbody id="userslist">
							{
								this.state.playerList.map((name, index) => {
									return (
										<tr key={index}>
											<td key={index}>
												{name}
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		)

		// <div id={game.ended ? "main-div" : ""}>
		// 
		// 	<BoardComp game={game} cardClicked={this.cardClicked} colorChosen={this.colorChosen} finishTurn={this.finishTurn} pullCard={this.pullCard} />
		// 	<ChangeColorComp show={this.state.showColorModal} handleClose={this.hideColorModal} />
		// 	<EndGameStatisticsComp show={showEndModal} handleClose={this.hideEndModal} game={game} newGame={this.newGame} />
		// </div >);
	}
}