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
			game: props.game,
			showColorModal: false,
			showEndModal: false
		};

		this.cardClicked = this.cardClicked.bind(this);
		this.colorChosen = this.colorChosen.bind(this);
		this.finishTurn = this.finishTurn.bind(this);
		this.pullCard = this.pullCard.bind(this);
		this.hideColorModal = this.hideColorModal.bind(this);
		this.showEndModal = this.showEndModal.bind(this);
		this.hideEndModal = this.hideEndModal.bind(this);
		this.newGame = this.newGame.bind(this);
		this.navigate = this.navigate.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
	}

	newGame() {
		this.state.game.newGame();
		this.setState({ showEndModal: false });
	}

	navigate() {
		this.state.game.navigate();
		this.setState({ showEndModal: false });
	}

	componentDidMount() {
		this.nextTurn();
	}

	showColorModal() {
		this.setState({
			game: this.state.game,
			showColorModal: true,
		});
	};

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
		if (game.navigateMode==false){
			const res = game.pullCard();
			this.setState(this.state);
			if (res == true)
				this.nextTurn();
		}
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

	prev() {
		const game = this.state.game;
		game.prev();
		this.setState(this.state);
	}

	next() {
		const game = this.state.game;
		game.next();
		this.setState(this.state);
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
		const { game } = this.props;
		const winnerIndex = game.winnerIndex;
		const showEndModal = (winnerIndex != undefined  && game.navigateMode == false) ? true : this.state.showEndModal;

		return (
			<div id={game.ended ? "main-div" : ""}>
				<StatusBarComp game={game.navigateMode ? game.prevUndoFrame : game} newGame={this.newGame} withdraw={this.showEndModal} navigateMode={game.navigateMode} className="status-bar"  />
				<BoardComp
					game={game.navigateMode ? game.prevUndoFrame : game}
					cardClicked={this.cardClicked}
					colorChosen={this.colorChosen}
					finishTurn={this.finishTurn}
					pullCard={this.pullCard} />
				{game.navigateMode &&
					<div align="center" id="navigation-line"><table width="40%"><tbody><tr><td padding="15px"><div align="center">
						<button onClick={this.prev} className="navigation-button"> &#60;&#60; prev </button>
					</div></td><td padding="15px"><div align="center">
						<button onClick={this.next} className="navigation-button"> next &#62;&#62; </button>
					</div></td></tr></tbody></table></div>
				}
				<ChangeColorComp show={this.state.showColorModal} handleClose={this.hideColorModal} />
				<EndGameStatisticsComp show={showEndModal} handleClose={this.hideEndModal} game={game} newGame={this.newGame} handleNavigate={this.navigate} />
			</div >);
	}
}