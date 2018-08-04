const constants = require('./constants');
const utilities = require('./utilities');

class Game {
	constructor(numRegularPlayers, numComputerPlayers, withComputer) {
		this.deck = undefined;
		this.openDeck = undefined;
		this.players = [];
		this.currentPlayerIndex = 0;
		this.currentColor = undefined;
		this.currentAction = undefined;
		this.plus2 = 0;
		this.message = undefined;
		this.statistics = new (require('./game_statistics.js'))();
		this.roomInfo = new (require('./RoomInfo.js'))();
		this.gameRunning = false;
		this.winners = [];
		this.numOfUsersWithdraw = 0;
		this.finishGame = false;
		this.withComputer = withComputer;
	}

	newGame() {
		this.deck = undefined;
		this.openDeck = undefined;
		this.players = [];
		this.currentPlayerIndex = 0;
		this.currentColor = undefined;
		this.currentAction = undefined;
		this.plus2 = 0;
		this.message = undefined;
		this.statistics = new (require('./game_statistics.js'))();
		this.gameRunning = false;
		this.winners = [];
		this.numOfUsersWithdraw = 0;
		this.finishGame = false;
		this.roomInfo.onlinePlayers = 0;
		this.roomInfo.startGame = false;
		this.init();
		if (this.withComputer == true) {
			this.addPlayer('Computer')
		}
	}

	nextTurn() {
		var playerIndex = this.currentPlayerIndex;
		var currentPlayer = this.players[playerIndex];

		// now computers play their turns, updating the game view after each turn
		if (currentPlayer.isComputerPlayer == true && this.gameRunning && !this.finishGame) {
			this.computerPlay();  	// computer calculates the actual turn 
		}
	}

	getCurrentPlayerName() {
		return this.players[this.currentPlayerIndex].name;
	}
	avgTurnsDurationsCurrentGame(username) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].name == username) {
				return this.players[i].statistics.avgTurnsDurationsCurrentGame;
			}
		}
	}

	singleCardCount(username) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].name == username) {
				return this.players[i].statistics.singleCardCount;
			}
		}
	}

	turnOf() {
		if (this.players[this.currentPlayerIndex])
			return this.players[this.currentPlayerIndex].name;
		else return '';
	}

	getGameRunning() {
		return this.gameRunning;
	}

	checkUniqueUser(name) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].name == name) {
				return false;
			}
		}

		return true;
	}

	isWin(username) {
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (this.players[i].name == username) {
				return this.players[i].win;
			}
		}
	}

	removePlayer(username) {
		if (!this.gameRunning || this.isWin(username)) {
			for (var i = this.players.length - 1; i >= 0; i--) {
				if (this.players[i].name == username) {
					this.deck.returnCards(this.players[i].cards);
					this.players.splice(i, 1);
				}
			}
		}
	}

	withdraw(username) {
		this.roomInfo.decreaseOnlinePlayers();
		this.removePlayer(username);
		if (this.gameRunning) {
			this.numOfUsersWithdraw++;
		}
		if ((this.withComputer) && (this.numOfUsersWithdraw + 1 == this.roomInfo.getTotalPlayers())) {
			this.removePlayer('Computer');
			this.finishGame = true;
			this.gameRunning = false;
			this.newGame();
		}
		else if (this.numOfUsersWithdraw == this.roomInfo.getTotalPlayers()) {
			this.finishGame = true;
			this.gameRunning = false;
			this.newGame();
		}
	}

	addPlayer(username) {
		if (this.roomInfo.getOnlinePlayers() < this.roomInfo.getTotalPlayers() && this.gameRunning == false) {
			this.roomInfo.increaseOnlinePlayers();
			var isComputerPlayer = username === 'Computer' ? true : false;
			var player = new (require('./player.js'))(username, isComputerPlayer);
			player.addCards(this.deck.takeCards(constants.NUM_INITIAL_CARDS));
			if (this.withComputer && this.players.length > 0) {
				this.players.splice(this.players.length - 1, 0, player);
			} else {
				this.players.push(player);
			}
			if (this.roomInfo.getOnlinePlayers() == this.roomInfo.getTotalPlayers()) {
				this.statistics.startTime = new Date().getTime();
				this.players[this.currentPlayerIndex].statistics.startTurn();
				this.gameRunning = true;
				this.finishGame = false;
				this.roomInfo.startGame = true;
			}
			return true;
		}

		return false;
	}

	setOrganizer(organizer) {
		this.roomInfo.setOrganizer(organizer);
	}

	getOrganizer() {
		return this.roomInfo.organizer;
	}

	setGameTitle(gameTitle) {
		this.roomInfo.setGameTitle(gameTitle);
	}

	setTotalPlayers(totalPlayers) {
		this.roomInfo.setTotalPlayers(totalPlayers);
	}

	getComputerPlayerIndex() {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].isComputerPlayer) return i;
		}
	}

	init() {
		this.deck = new (require('./deck.js'))();
		this.deck.init();
		this.openDeck = new (require('./open_deck.js'))();

		do {
			this.openDeck.putCard(this.deck.takeCards(1)[0])
			this.currentColor = this.openDeck.getTopCard().color;
		} while (!this.openDeck.getTopCard().isValidStartCard())
	}

	cyclicIncrementCurrentPlayerIndex(stop) {
		this.currentAction = undefined;
		this.statistics.turnsCount++;

		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
		while (this.players[this.currentPlayerIndex].win == true) {
			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
		}

		if (stop == true) {
			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
			while (this.players[this.currentPlayerIndex].win == true) {
				this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
			}
		}

		this.players[this.currentPlayerIndex].statistics.startTurn();
	}

	computerPlay() {
		// let the computer play calculate its turn and return the card to put
		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction, this.plus2);

		if (res.length == 0 && this.currentAction != "taki" && this.currentAction != "superTaki")  // computer has no valid cards to put
			this.pullCard();
		else if (res.length == 0 && (this.currentAction == "taki" || this.currentAction == "superTaki"))
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
			this.play(res[1], res[0], this.currentPlayerIndex);
		}
	}

	pullCard() {
		if (this.currentAction == "taki") {
			this.message = "Invalid choice";
			return false;
		}

		if (this.currentAction == "superTaki") {
			this.message = "Invalid choice";
			return false;
		}

		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction, this.plus2);
		if (res.length != 0) {
			this.message = "Cannot pull - a valid card's in your hand";
			return false;
		}

		var num = this.plus2 == 0 ? 1 : this.plus2;

		for (var i = 0; i < num; i++) {
			this.players[this.currentPlayerIndex].addCards(this.deck.takeCards(1));

			if (this.deck.getNumberOfCards() == 0) {
				var topCard = this.openDeck.cards.pop();
				utilities.shuffleArray(this.openDeck.cards);
				this.deck.returnCards(this.openDeck.cards);
				this.openDeck.putCard(topCard);
			}
		}

		this.plus2 = 0;
		this.cyclicIncrementCurrentPlayerIndex(false);

		return true;
	}

	finishTurn() {
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

	moveCardToOpenDeck(card, cardIndex, playerIndex) {
		if (card.action != "superTaki")
			this.currentColor = card.color;
		this.openDeck.putCard(this.players[playerIndex].cards[cardIndex])
		this.players[playerIndex].cards.splice(cardIndex, 1);

		var cardsCountAfterTurn = this.players[playerIndex].cards.length;
		this.players[playerIndex].statistics.endTurn(cardsCountAfterTurn);

		if (this.players[playerIndex].cards.length == 0 && this.openDeck.getTopCard().action != "plus") {
			this.players[playerIndex].win = true;
			this.winners.push(this.players[playerIndex]);
			if (this.winners.length + 1 == this.roomInfo.getTotalPlayers()) {
				for (var i = 0; i < this.players.length; i++) {
					if (this.players[i].win == false) {
						this.winners.push(this.players[i]);
					}
				}
				this.finishGame = true;
			}
		}
	}

	changeColor(card, cardIndex, playerIndex) {
		this.message = "";

		if (this.currentAction == "taki" || this.currentAction == "superTaki") {
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


	play(card, cardIndex, playerIndex) {
		this.message = "";

		if ((this.currentAction == "taki" || this.currentAction == "superTaki") && this.currentColor != card.color) {
			this.message = "Invalid choice";
			return false;
		}

		if (this.plus2 != 0 && card.action != "plus2") {
			this.message = "Invalid choice";
			return false;
		}

		if (this.currentAction != "taki" && this.currentAction != "superTaki") {

			if (card.number != null) {
				if (this.currentColor != card.color && this.openDeck.getTopCard().number != card.number) {
					this.message = "Invalid choice";
					return false;
				}
				this.cyclicIncrementCurrentPlayerIndex(false)
			}
			else if (card.action == "taki") {
				if (this.currentColor != card.color && this.openDeck.getTopCard().action != "taki") {
					this.message = "Invalid choice";
					return false;
				}
				this.currentAction = "taki";
			}
			else if (card.action == "superTaki") {
				this.currentAction = "superTaki";
			}
			else if (card.action == "stop") {
				if (this.currentColor != card.color && this.openDeck.getTopCard().action != "stop") {
					this.message = "Invalid choice";
					return false;
				}
				this.cyclicIncrementCurrentPlayerIndex(true)
			}
			else if (card.action == "plus") {
				if (this.currentColor != card.color && this.openDeck.getTopCard().action != "plus") {
					this.message = "Invalid choice";
					return false;
				}
				this.message = "another turn";
			}
			else if (card.action == "plus2") {
				if (this.currentColor != card.color && this.openDeck.getTopCard().action != "plus2") {
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
}


module.exports = Game;