import GameStatistics from './game_statistics';
import Deck from './deck';
import OpenDeck from './open_deck';
import Player from './player';
import PlayerStatistics from './player_statistics';
import * as constants from './constants'
import * as utilities from './utilities'

let Game = function(numRegularPlayers, numComputerPlayers) {
	this.deck = undefined;
	this.openDeck = undefined;
	this.players = [];
	this.currentPlayerIndex = 0;
	this.currentColor = undefined;
	this.currentAction = undefined;
	this.plus2 = 0;
	this.message = undefined;
	this.NUM_REGULAR_PLAYERS = numRegularPlayers;
	this.NUM_COMPUTER_PLAYERS = numComputerPlayers;
	this.statistics = new GameStatistics();

	this.addPlayer = function (isComputerPlayer) {
		this.players.push(new Player(isComputerPlayer))
	};

	this.initPlayers = function () {
		for (var i = 0; i < this.NUM_REGULAR_PLAYERS; i++) {
			this.addPlayer(false);
		};
		for (var i = 0; i < this.NUM_COMPUTER_PLAYERS; i++) {
			this.addPlayer(true);
		};

		this.players = utilities.shuffleArray(this.players);

		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCards(this.deck.takeCards(constants.NUM_INITIAL_CARDS));
		}
	};

	this.getComputerPlayerIndex = function () {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].isComputerPlayer) return i;
		}
	}

	this.init = function () {
		this.deck = new Deck();
		this.deck.init();
		this.openDeck = new OpenDeck();
		this.initPlayers();

		do {
			this.openDeck.putCard(this.deck.takeCards(1)[0])
			this.currentColor = this.openDeck.getTopCard().getColor();
		} while (!this.openDeck.getTopCard().isValidStartCard())
	};

	this.newGame = function () {
		this.deck = new Deck();
		this.deck.init();
		this.openDeck = new openDeck();
		this.currentPlayerIndex = 0;
		this.currentColor = undefined;
		this.currentAction = undefined;
		this.message = undefined;
		this.statistics.turnsCount = 0;
		this.statistics.startTime = new Date().getTime();

		for (var i = 0; i < this.players.length; i++) {
			clearArray(this.players[i].cards);
			this.players[i].addCards(this.deck.takeCards(NUM_INITIAL_CARDS));
			this.players[i].statistics.singleCardCount = 0;
			this.players[i].statistics.numOfTurnsCurrentGame = 0;
			this.players[i].statistics.avgTurnsDurationsCurrentGame = 0;
		}

		do {
			this.openDeck.putCard(this.deck.takeCards(1)[0])
			this.currentColor = this.openDeck.getTopCard().getColor();
		} while (!this.openDeck.getTopCard().isValidStartCard())
	}

	this.cyclicIncrementCurrentPlayerIndex = function (stop) {
		this.currentAction = undefined;
		this.statistics.turnsCount++;

		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
		if (stop == true)
			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

		this.players[this.currentPlayerIndex].statistics.startTurn();
	};

	this.computerPlay = function () {
		// let the computer play calculate its turn and return the card to put
		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction, this.plus2);

		if (res.length == 0 && this.currentAction != "taki")  // computer has no valid cards to put
			this.pullCard();
		else if (res.length == 0 && this.currentAction == "taki")
			this.finishTurn();
		else if (res.length == 0 && this.plus2 != 0)  // computer has no valid cards to put
			this.pullCard();
		else if (res[1].action == "changeColor") {
			this.moveCardToOpenDeck(res[1], res[0], this.currentPlayerIndex);
			var i = Math.floor(Math.random() * constants.COLORS.length);
			this.currentColor = constants.COLORS[i];
			this.cyclicIncrementCurrentPlayerIndex(false);
		}  // put the card of the computer's turn if any
		else {
			console.log("aaa")
			this.play(res[1], res[0], this.currentPlayerIndex);
		}
	}

	this.pullCard = function () {
		if (this.currentAction == "taki") {
			this.message = "Invalid choice";
			return false;
		}

		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction, this.plus2);
		if (res.length != 0) {
			this.message = "Cannot pull - a valid card's in your hand";
			return false;
		}

		this.players[this.currentPlayerIndex].addCards(this.deck.takeCards(1));

		if (this.deck.getNumberOfCards() == 0) {
			var topCard = this.openDeck.cards.pop();
			utilities.shuffleArray(this.openDeck.cards);
			this.deck.returnCards(this.openDeck.cards);
			this.openDeck.putCard(topCard);
		}

		if (this.plus2 == 0)
			this.cyclicIncrementCurrentPlayerIndex(false)
		else this.plus2--;

		return true;
	}

	this.finishTurn = function () {
		this.currentAction = undefined;

		if (this.openDeck.getTopCard().action == "plus")
			this.message = "another turn";
		else if (this.openDeck.getTopCard().action == "plus2") {
			this.plus2 += 2;
			this.cyclicIncrementCurrentPlayerIndex(false);
		}
		else if (this.openDeck.getTopCard().action != "stop")
			this.cyclicIncrementCurrentPlayerIndex(false)
		else
			this.cyclicIncrementCurrentPlayerIndex(true)

	}

	this.moveCardToOpenDeck = function (card, cardIndex, playerIndex) {
		this.currentColor = card.getColor();
		this.openDeck.putCard(this.players[playerIndex].cards[cardIndex])
		this.players[playerIndex].cards.splice(cardIndex, 1);

		var cardsCountAfterTurn = this.players[playerIndex].cards.length;
		this.players[playerIndex].statistics.endTurn(cardsCountAfterTurn);

		if (this.players[playerIndex].cards.length == 0 && this.openDeck.getTopCard().action != "plus") {
			endGame(playerIndex)
		}
	}

	this.changeColor = function (card, cardIndex, playerIndex) {
		this.message = "";

		if (this.currentAction == "taki") {
			this.message = "not valid";
			return false;
		}

		if (this.plus2 != 0) {
			this.message = "not valid";
			return false;
		}

		this.moveCardToOpenDeck(card, cardIndex, playerIndex);
		return true;
	}


	this.play = function (card, cardIndex, playerIndex) {
		this.message = "";

		if (this.currentAction == "taki" && this.currentColor != card.getColor()) {
			this.message = "Invalid choice";
			return false;
		}

		if (this.plus2 != 0 && card.action != "plus2") {
			this.message = "Invalid choice";
			return false;
		}

		if (this.currentAction != "taki") {

			if (card.number != null) {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().number != card.number) {
					this.message = "Invalid choice";
					return false;
				}
				this.cyclicIncrementCurrentPlayerIndex(false)
			}
			else if (card.action == "taki") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "taki") {
					this.message = "Invalid choice";
					return false;
				}
				this.currentAction = "taki";
			}
			else if (card.action == "stop") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "stop") {
					this.message = "Invalid choice";
					return false;
				}
				this.cyclicIncrementCurrentPlayerIndex(true)
			}
			else if (card.action == "plus") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "plus") {
					this.message = "Invalid choice";
					return false;
				}
				this.message = "another turn";
			}
			else if (card.action == "plus2") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "plus2") {
					this.message = "Invalid choice";
					return false;
				}
				this.plus2 += 2;
				this.cyclicIncrementCurrentPlayerIndex(false);
			}

		}

		this.moveCardToOpenDeck(card, cardIndex, playerIndex);
		return true;
	}


	this.nextTurn = function() {
		// updateGameView();

		var playerIndex = this.currentPlayerIndex;
		var currentPlayer = this.players[playerIndex];

		// now computers play their turns, updating the game view after each turn
		while (currentPlayer.isComputerPlayer == true) {
			this.computerPlay();  	// computer calculates the actual turn 
			console.log("morann")
			// await sleep(3000);
			// updateGameView();
			var playerIndex = this.currentPlayerIndex;
			currentPlayer = this.players[playerIndex];
		}
	}

	// this.makeTurn = function(callback, args){
	// 	var result = {};
	// 	if (callback){
	// 		result = callback(args);
	// 	}
	// }
};

////////////////////////////////////////////////////

Game.prototype.updateOpenDeck = function () {
	var openDeckDiv = document.getElementById("open-deck")
	openDeckDiv.innerHTML = "<img src=\"cards/" + this.openDeck.getTopCard().getFileName() + "\"/>"
}


Game.prototype.updateDeckCount = function () {
	var deckTextDiv = document.getElementById("deck-text")
	deckTextDiv.innerHTML = this.deck.getNumberOfCards()
}


Game.prototype.withdraw = function () {
	endGame(this.getComputerPlayerIndex());
}
////////////////////////////////////////////////////

export default Game;