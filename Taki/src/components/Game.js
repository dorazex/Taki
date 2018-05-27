class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: props.options
		};
	}
	handleDeleteOptions() {
		this.setState(() => {
			return {
				options: []
			};
		});
	}
	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		alert(option);
	}
	handleAddOption(option) {
		if (!option) {
			return 'Enter valid value to add item';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => {
			return {
				options: prevState.options.concat(option)
			};
		});
	}
	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}

IndecisionApp.defaultProps = {
	options: []
};


import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
	state = {
		options: []
	};
	handleDeleteOptions = () => {
		this.setState(() => ({ options: [] }));
	};
	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	};
	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		alert(option);
	};
	handleAddOption = (option) => {
		if (!option) {
			return 'Enter valid value to add item';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => ({
			options: prevState.options.concat(option)
		}));
	};
	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch (e) {
			// Do nothing at all
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
	render() {
		const subtitle = 'Put your life in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}


///////////////////////////////
import React from 'react';
import Header from './StatusBar';
import Options from './Board';
//import Validations from '../models/utilities';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.activeCardOnClick = this.activeCardOnClick.bind(this);
		this.activeChangeColor = this.activeChangeColor.bind(this);
		this.state = {
			game: props.game
		};
	}

	activeCardOnClick = (cardIndex, playerIndex) => {
		const card = this.state.game.players[playerIndex].cards[cardIndex];
		this.state.game.play(card, cardIndex, playerIndex);
	};

	activeChangeColor = (cardIndex, playerIndex) => {
		let card = this.state.game.players[playerIndex].cards[cardIndex];
		let res = this.state.game.changeColor(card, cardIndex, playerIndex);

		

		if (res == true)
			;//document.getElementById('change-color-modal').style.display = "block";
	}



	pullCard = () => {
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

	async nextTurn() {
		//updateGameView();

		let playerIndex = this.state.game.currentPlayerIndex;
		let currentPlayer = this.state.game.players[playerIndex];

		// now computers play their turns, updating the game view after each turn
		while (currentPlayer.isComputerPlayer == true) {
			this.state.game.computerPlay();  	// computer calculates the actual turn 
			await sleep(3000);
			//updateGameView();
			playerIndex = this.stategame.currentPlayerIndex;
			currentPlayer = this.state.game.players[playerIndex];
		}
	}
}








////////////////////////








import GameCreator from '../helpers/gameCreator';










export default class Game extends React.Component {


	componentDidMount() {
		window.addEventListener('pc-event', this.handlePcEvent, false);
	}

	componentWillUnmount() {
		window.removeEventListener('pc-event', this.handlePcEvent, false);
	}







	commitTaki() {
		console.log('Game commitTaki');

		this.state.game.finishTakiTurn();

		this.setState(this.state);
	}


	onColorChoosed(color, card, player) {
		const { game } = this.state;

		game.turn(function (args) {
			const { game, card, player } = args;

			player.putCard(game.heap, card);
			game.heap.currentColor = color.toUpperCase();

			var step = { card, color, player };
			return { updateTurnInfo: true, moveNextPlayer: true, step };
		}, { game, color, card, player });
	}

	onRestart() {
		this.state.game = GameCreator.createStandardGame();
		this.setState(this.state);
	}



	loadGameByState(state) {
		var game = this.props.game;
		if (state) {
			this.cloneObject(state.players, game.players);
			this.cloneObject(state.deck, game.deck);
			this.cloneObject(state.heap, game.heap);
			this.cloneObject(state.winners, game.winners);
			this.cloneObject(state.quiters, game.quiters);
		}
	}

	cloneObject(src, target) {
		for (var i in src) {
			if (target) {
				if (src[i] != null && typeof (src[i]) == 'object' && !Array.isArray(src[i])) {
					this.cloneObject(src[i], target[i]);
				}
				else {
					target[i] = src[i];
				}
			}
		}
	}

	render() {
		const { game } = this.state;

		if ((game.isGameOver() || game.finished) && !game.navigationMode) {
			return <StatisticsComponent game={game} onRestart={this.onRestart} onNavigate={this.onNavigate} />;
		}
		else {
			return (<div>
				<BoardComponent game={game} quitClicked={this.quitClicked}
					cardClicked={this.cardClicked} onColorChoosed={this.onColorChoosed}
					deckClicked={this.deckClicked} commitTaki={this.commitTaki}
					nextClick={this.nextClick}
					prevClick={this.prevClick}
					onRestart={this.onRestart}
				/>
				<StatusBarComponent game={game} />
			</div>);
		}
	}
}







var updateOpenDeck = function () {
	var openDeckDiv = document.getElementById("open-deck")
	openDeckDiv.innerHTML = "<img src=\"cards/" + window.game.openDeck.getTopCard().getFileName() + "\"/>"
}

var updateDeckCount = function () {
	var deckTextDiv = document.getElementById("deck-text")
	deckTextDiv.innerHTML = game.deck.getNumberOfCards()
}






var updateTurn = function () {
	var turnOf = game.players[window.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human";
	document.getElementById("turn").innerHTML = "Turn of " + turnOf;

	for (var i = 0; i < game.players.length; i++) {
		var playerDivId = "player-container-" + i;
		var playerDiv = document.getElementById(playerDivId);
		var deckDiv = document.getElementById("deck");
		var c = playerDiv.children;

		var j;
		for (j = 0; j < c.length; j++) {
			if (i == window.game.currentPlayerIndex) {
				c[j].classList.remove("disabled");
				playerDiv.classList.add("currentplayerdiv");
			}
			else {
				c[j].classList.add("disabled");
				playerDiv.classList.remove("currentplayerdiv");
			}
		}

		if (game.players[window.game.currentPlayerIndex].isComputerPlayer == false)
			deckDiv.classList.remove("disabled");
		else deckDiv.classList.add("disabled");
	}
}


var updateColor = function () {
	document.getElementById("color").innerHTML = game.currentColor;
}

var updateGameView = function () {
	var gameDiv = document.getElementById("game");
	for (var i = 0; i < game.players.length; i++) {
		var playerDivId = "player-container-" + i;
		if (!isChildExistById("game", playerDivId)) {
			playerDiv = document.createElement("div")
			playerDiv.className = "player-cards-flex-container";
			playerDiv.id = playerDivId
			gameDiv.appendChild(playerDiv);
		} else {
			playerDiv = document.getElementById(playerDivId)
		}

		while (playerDiv.firstChild) {
			playerDiv.removeChild(playerDiv.firstChild);
		}

		for (var j = 0; j < game.players[i].cards.length; j++) {
			var cardDivId = "card-" + j + "-player-" + i;
			var cardDiv = document.createElement("div")
			cardDiv.id = cardDivId
			playerDiv.appendChild(cardDiv);
			if (game.players[i].isComputerPlayer == false) {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = "<img src=\"cards/" + card.getFileName() + "\" onmouseover=\"\" style=\"cursor: pointer;\"/>"
				if (card.action == "changeColor")
					cardDiv.addEventListener('click', activeChangeColor);
				else cardDiv.addEventListener('click', activeCardOnClick);
			} else {
				var card = game.players[i].cards[j]
				//cardDiv.innerHTML = "<img src=\"cards/cover_0_0.png\"/>"
				cardDiv.innerHTML = "<img src=\"cards/" + card.getFileName() + "\"/>"
			}
		}
	}

	updateOpenDeck()
	updateDeckCount()
	updateColor()
	updateTurn()
}



function changeColor(color) {
	document.getElementById('change-color-modal').style.display = "none";
	window.game.currentColor = color;
	window.game.cyclicIncrementCurrentPlayerIndex(false);
	nextTurn();
}

var finishTurnOnClick = function () {
	game.finishTurn()
	document.getElementById("message").innerHTML = window.game.message;
	document.getElementById("finish-turn").style.visibility = 'hidden';
	nextTurn()
}





