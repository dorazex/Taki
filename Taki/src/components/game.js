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
		this.hideEndModal = this.hideEndModal.bind(this);
		this.withdraw = this.withdraw.bind(this);
		this.finishGame = this.finishGame.bind(this);
		this.nextTurn = this.nextTurn.bind(this);
	}

	componentDidMount() {
		this.nextTurn();
		this.finishGame();
	}

	componentWillUnmount() {
		if (this.timeoutId1) {
			clearTimeout(this.timeoutId1);
		}
		if (this.timeoutId2) {
			clearTimeout(this.timeoutId2);
		}
	}
	
	nextTurn() {
		return fetch('/game/nextTurn', { method: 'GET', credentials: 'include' })
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				this.timeoutId1 = setTimeout(this.nextTurn, 200);
				this.setState(this.state);
			})
	}

	finishGame() {
		return fetch('/game/finishGame', { method: 'GET', credentials: 'include' })
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
				this.timeoutId2 = setTimeout(this.finishGame, 200);
				return response.json();
			})
			.then(res => {
				if (res.finishGame == true) {
					this.setState(() => ({ showEndModal: true, winners: res.winners, gameStatistics: res.gameStatistics }));
				}
			})
			.catch(err => { throw err });
	}

	hideEndModal() {
		this.setState({
			showEndModal: false
		}, () => {
			this.props.userWithdraw();
		});
	};

	withdraw() {
		this.props.userWithdraw();
	}

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
		return (
			<div>
				<StatusBarComp withdraw={this.withdraw} className="status-bar" />
				<BoardComp username={this.props.username} cardClicked={this.cardClicked} colorChosen={this.colorChosen} finishTurn={this.finishTurn} pullCard={this.pullCard} />
				<ChangeColorComp show={this.state.showColorModal} handleClose={this.hideColorModal} />
				<EndGameStatisticsComp show={this.state.showEndModal} handleClose={this.hideEndModal} winners={this.state.winners} gameStatistics={this.state.gameStatistics} />
			</div>
		)
	}
}