function Game(numRegularPlayers, numComputerPlayers) {
	this.deck = undefined;
	this.openDeck = undefined;
	this.players = [];
	this.currentPlayerIndex = 0;
	this.currentColor = undefined;
	this.currentAction = undefined;
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

		this.players = shuffleArray(this.players);

		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCards(this.deck.takeCards(NUM_INITIAL_CARDS));
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
		this.openDeck = new openDeck();
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
			//this.players[i].statistics = new PlayerStatistics()
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

		var cardsCountAfterTurn = this.players[this.currentPlayerIndex].cards.length;
		this.players[this.currentPlayerIndex].statistics.endTurn(cardsCountAfterTurn);

		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
		if (stop == true)
			this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

		// console.log(`changed player index to: ${this.currentPlayerIndex}`)

		this.players[this.currentPlayerIndex].statistics.startTurn();
	};

	this.computerPlay = function () {
		// let the computer play calculate its turn and return the card to put
		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction);

		if (res.length == 0 && this.currentAction != "taki")  // computer has no valid cards to put
			this.pullCard();
		else if (res.length == 0 && this.currentAction == "taki")
			this.finishTurn();
		else if (res[1].action == "changeColor") {
			window.game.moveCardToOpenDeck(res[1], res[0], this.currentPlayerIndex);
			var i = Math.floor(Math.random() * COLORS.length);
			this.currentColor = COLORS[i];
			this.cyclicIncrementCurrentPlayerIndex(false);
		}  // put the card of the computer's turn if any
		else this.play(res[1], res[0], this.currentPlayerIndex);
	}

	this.pullCard = function () {
		//if (this.players[this.currentPlayerIndex].isComputerPlayer == true)
		//	return false;
		if (this.currentAction == "taki") {
			this.message = "pull card not valid";
			return false;
		}

		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor, this.currentAction);
		if (res.length != 0) {
			this.message = "pull card not valid";
			return false;
		}

		this.players[window.game.currentPlayerIndex].addCards(this.deck.takeCards(1));

		if (this.deck.getNumberOfCards() == 0) {
			var topCard = this.openDeck.cards.pop();
			shuffleArray(this.openDeck.cards);
			this.deck.returnCards(this.openDeck.cards);
			this.openDeck.putCard(topCard);
		}

		this.cyclicIncrementCurrentPlayerIndex(false)
		return true;
	}

	this.finishTurn = function () {
		this.currentAction = undefined;

		if (this.openDeck.getTopCard().action == "plus")
			this.message = "another turn";
		else if (this.openDeck.getTopCard().action != "stop")
			this.cyclicIncrementCurrentPlayerIndex(false)
		else
			this.cyclicIncrementCurrentPlayerIndex(true)

	}

	this.moveCardToOpenDeck = function (card, cardIndex, playerIndex) {
		this.currentColor = card.getColor();
		this.openDeck.putCard(this.players[playerIndex].cards[cardIndex])
		this.players[playerIndex].cards.splice(cardIndex, 1);
		console.log("-----> Player " + playerIndex + ": " + this.players[playerIndex].cards.length);
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

		this.moveCardToOpenDeck(card, cardIndex, playerIndex);
		return true;
	}


	this.play = function (card, cardIndex, playerIndex) {
		this.message = "";

		if (this.currentAction == "taki" && this.currentColor != card.getColor()) {
			this.message = "not valid";
			return false;
		}

		if (this.currentAction != "taki") {

			if (card.number != null) {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().number != card.number) {
					this.message = "not valid";
					return false;
				}
				//if (this.currentAction != "taki")
				this.cyclicIncrementCurrentPlayerIndex(false)
			}
			else if (card.action == "taki") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "taki") {
					this.message = "not valid";
					return false;
				}
				this.currentAction = "taki";
			}
			else if (card.action == "stop") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "stop") {
					this.message = "not valid";
					return false;
				}
				//if (this.currentAction != "taki")
				this.cyclicIncrementCurrentPlayerIndex(true)
				// this.cyclicIncrementCurrentPlayerIndex(false)
			}
			else if (card.action == "plus") {
				if (this.currentColor != card.getColor() && this.openDeck.getTopCard().action != "plus") {
					this.message = "not valid";
					return false;
				}
				//this.currentAction = "plus";
				this.message = "another turn";
			}
		}

		this.moveCardToOpenDeck(card, cardIndex, playerIndex);
		return true;
	}
};

var updateStatistics = function () {
	document.getElementById('turns-count').innerHTML = "Turns Count: " + window.game.statistics.turnsCount;
	document.getElementById('game-duration').innerHTML = "Game Duration: " + miliSecondsToTimeString(window.game.statistics.getGameDuration());
	document.getElementById('turn-average').innerHTML = "Turn Average Duration: " + miliSecondsToTimeString(window.game.players[window.game.currentPlayerIndex].statistics.avgTurnsDurationsCurrentGame);
	document.getElementById('turn-average-all-games').innerHTML = "Turn Average Duration All Games: " + miliSecondsToTimeString(window.game.players[window.game.currentPlayerIndex].statistics.avgTurnsDurationsAllGames);
	document.getElementById('single-card-count').innerHTML = "Single Card Count: " + window.game.players[window.game.currentPlayerIndex].statistics.singleCardCount;

	playerStatsTable = document.getElementById("players-statistics-table")
	playerStatsTable.innerHTML = "";

	var game = window.game;
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

	playerStatsTable.insertRow(0).innerHTML = "<tr><th>Player</th><th>Average turn duration</th><th>Single card occasions</th></tr>"
}


window.onload = function () {
	setInterval(function () { updateStatistics(); }, 100);
	url = window.location.href
	urlParameters = url.split("?")[1]
	numRegularPlayers = parseInt(urlParameters.split("&")[0].split("=")[1])
	numComputerPlayers = parseInt(urlParameters.split("&")[1].split("=")[1])

	// init
	var game = new Game(numRegularPlayers, numComputerPlayers);
	game.init();
	window.game = game

	document.getElementById("finish-turn").style.visibility = 'hidden';
	updateGameView()
	updateStatistics()
	game.players[game.currentPlayerIndex].statistics.startTurn();

	nextTurn()
}

var updateOpenDeck = function () {
	var openDeckDiv = document.getElementById("open-deck")
	openDeckDiv.innerHTML = `<img src=\"cards/${window.game.openDeck.getTopCard().getFileName()}\"/>`
}

var updateDeckCount = function () {
	var deckTextDiv = document.getElementById("deck-text")
	deckTextDiv.innerHTML = `${game.deck.getNumberOfCards()}`
}

var activeChangeColor = function (event) {

	cardDiv = event.path[1]
	playerDiv = event.path[2]
	var cardIndex = parseInt(cardDiv.id.split("-")[1])
	var playerIndex = parseInt(playerDiv.id.split("-")[2])
	var card = game.players[playerIndex].cards[cardIndex];

	var res = game.changeColor(card, cardIndex, playerIndex);

	document.getElementById("message").innerHTML = window.game.message;

	if (res == true)
		document.getElementById('change-color-modal').style.display = "block";
}

var activeCardOnClick = function (event) {
	cardDiv = event.path[1]
	playerDiv = event.path[2]
	var cardIndex = parseInt(cardDiv.id.split("-")[1])
	var playerIndex = parseInt(playerDiv.id.split("-")[2])
	var card = game.players[playerIndex].cards[cardIndex];

	var res = game.play(card, cardIndex, playerIndex);

	document.getElementById("message").innerHTML = window.game.message;

	if (window.game.currentAction == "taki") {
		document.getElementById("finish-turn").style.visibility = 'visible';
	}

	nextTurn()
}


var updateTurn = function () {
	var turnOf = game.players[window.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human";
	document.getElementById("turn").innerHTML = "Turn of " + turnOf;

	for (var i = 0; i < game.players.length; i++) {
		var playerDivId = `player-container-${i}`;
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
	// console.log("update game view")
	var gameDiv = document.getElementById("game");
	for (var i = 0; i < game.players.length; i++) {
		var playerDivId = `player-container-${i}`;
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
			var cardDivId = `card-${j}-player-${i}`
			var cardDiv = document.createElement("div")
			cardDiv.id = cardDivId
			playerDiv.appendChild(cardDiv);
			if (game.players[i].isComputerPlayer == false) {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\" onmouseover=\"\" style=\"cursor: pointer;\"/>`
				if (card.action == "changeColor")
					cardDiv.addEventListener('click', activeChangeColor);
				else cardDiv.addEventListener('click', activeCardOnClick);
			} else {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
				//cardDiv.innerHTML = `<img src=\"cards/cover_0_0.png\"/>`
			}
		}
	}

	updateOpenDeck()
	updateDeckCount()
	updateColor()
	updateTurn()
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var nextTurn = async function () {
	updateGameView();

	var playerIndex = window.game.currentPlayerIndex;
	var currentPlayer = window.game.players[playerIndex];
	// console.log("turn of: " + playerIndex)

	// now computers play their turns, updating the game view after each turn
	while (currentPlayer.isComputerPlayer == true) {
		await sleep(2000);
		window.game.computerPlay();  	// computer calculates the actual turn 
		updateGameView();
		var playerIndex = window.game.currentPlayerIndex;
		currentPlayer = game.players[playerIndex];
	}
}

function changeColor(color) {
	document.getElementById('change-color-modal').style.display = "none";
	window.game.currentColor = color;
	window.game.cyclicIncrementCurrentPlayerIndex(false)
	nextTurn()
}

var finishTurnOnClick = function () {
	game.finishTurn()
	document.getElementById("message").innerHTML = window.game.message;
	document.getElementById("finish-turn").style.visibility = 'hidden';
	nextTurn()
}

var pullCard = function () {
	res = window.game.pullCard();
	if (res == true) {
		nextTurn()
	} else {
		document.getElementById("message").innerHTML = window.game.message;
	}
}

var withdraw = function () {
	endGame(window.game.getComputerPlayerIndex());
}


var endGame = function (winnerIndex) {
	modalTitleFont = document.getElementById("end-game-modal-winner-title").innerHTML = "The winner is: " + winnerIndex
	document.getElementById('end-turns-count').innerHTML = window.game.statistics.turnsCount;
	document.getElementById('end-game-duration').innerHTML = miliSecondsToTimeString(window.game.statistics.getGameDuration());
	endGameModal = document.getElementById('end-game-modal');
	endGameModal.style.display = "block";
}

var hideStatistics = function () {
	endGameModal = document.getElementById('end-game-modal');
	endGameModal.style.display = "none";
}


var newGame = function () {
	hideStatistics();
	game.newGame();

	document.getElementById("finish-turn").style.visibility = 'hidden';
	updateGameView()
	updateStatistics()
	game.players[game.currentPlayerIndex].statistics.startTurn();

	nextTurn()
}