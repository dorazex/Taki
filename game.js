function Game(numRegularPlayers, numComputerPlayers) {
	this.deck = [];
	this.openDeck = [];
	this.players = [];
	this.currentPlayerIndex = 0;
	this.currentColor = undefined;
	this.currentAction = undefined;
	this.message = "";
	this.NUM_REGULAR_PLAYERS = numRegularPlayers;
	this.NUM_COMPUTER_PLAYERS = numComputerPlayers;

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
		//this.players = shuffleArray(this.players);

		for (var i = 0; i < this.players.length; i++) {
			this.players[i].addCards(this.deck.takeCards(NUM_INITIAL_CARDS));
		}
	};

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

	this.cyclicIncrementCurrentPlayerIndex = function () {
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
		console.log(`changed player index to: ${this.currentPlayerIndex}`)
	};

	this.play = function (card) {
		res = false;
		this.message = "";
		if (card.number != null) {
			if (this.currentAction == "taki") {
				if (this.currentColor != card.getColor()) {
					this.message = "not valid selection";
					return false;
				}
			}
			else {
				if (this.currentColor != card.getColor()
					&& this.openDeck.getTopCard().number != card.number) {
					this.message = "not valid selection";
					return false;
				}
				this.currentColor = card.getColor();
				res = true;
			}
		}
		else if (card.action == "taki") {
			if (this.currentAction == "taki") {
				if (this.currentColor != card.getColor()) {
					this.message = "not valid selection";
					return false;
				}
			}
			else {
				if (this.currentColor != card.getColor()
					&& this.openDeck.getTopCard().action != "taki") {
					this.message = "not valid selection";
					return false;
				}
				this.currentAction = "taki";
				this.currentColor = card.getColor();
			}
		}
		else if (card.action == "stop") {
			if (this.currentAction == "taki") {
				if (this.currentColor != card.getColor()) {
					this.message = "not valid selection";
					return false;
				}
			}
			else {
				if (this.currentColor != card.getColor()
					&& this.openDeck.getTopCard().action != "stop") {
					this.message = "not valid selection";
					return false;
				}
				this.currentColor = card.getColor();
			}
		}

		return res;
	}
};


window.onload = function () {
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
	updeteTurn()
	updateOpenDeck()
	updateDeckCount()
	updateColor()
}

var updateOpenDeck = function () {
	var openDeckDiv = document.getElementById("open-deck")
	openDeckDiv.innerHTML = `<img src=\"cards/${window.game.openDeck.getTopCard().getFileName()}\"/>`
}

var updateDeckCount = function () {
	var deckTextDiv = document.getElementById("deck-text")
	deckTextDiv.innerHTML = `${game.deck.getNumberOfCards()}`
}

var activeCardOnClick = function (event) {
	cardDiv = event.path[1]
	playerDiv = event.path[2]
	var cardIndex = parseInt(cardDiv.id.split("-")[1])
	var playerIndex = parseInt(playerDiv.id.split("-")[2])
	console.log("player " +  game.players[playerIndex]);
	var card = game.players[playerIndex].cards[cardIndex];
	var next = false;
	var next = game.play(card);

	document.getElementById("message").innerHTML = window.game.message;

	if (window.game.message == "") {
		updateColor();
		if (window.game.currentAction == "taki")
			document.getElementById("finish-turn").style.visibility = 'visible';

		playerDiv.removeChild(cardDiv)
		game.openDeck.putCard(game.players[playerIndex].cards[cardIndex])
		game.players[playerIndex].cards.splice(cardIndex, 1)
		updateGameView()


		if (next == true) {
			nextTurn()
		}

		if (card.action == "changeColor") {
			document.getElementById('change-color-modal').style.display = "block";
		}
	}
}


var updeteTurn = function () {
	var turnOf = game.currentPlayerIndex == 0 ? "Human" : "Computer";
	document.getElementById("turn").innerHTML = "Turn of " + turnOf;

	var humanDiv = document.getElementById("player-container-0")
	var c = humanDiv.children;
	var i;
	for (var i = 0; i < c.length; i++) {
		if (game.currentPlayerIndex == 0)
			c[i].className -= "disabled";
		else
			c[i].className += "disabled";
	}
}

var updateColor = function () {
	document.getElementById("color").innerHTML = game.currentColor;
}

var updateGameView = function () {
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
			var cardDivId = `card-${j}`
			var cardDiv = document.createElement("div")
			cardDiv.id = cardDivId
			playerDiv.appendChild(cardDiv);
			if (i == 0) {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
				cardDiv.addEventListener('click', activeCardOnClick)
			} else {
				cardDiv.innerHTML = '<img src="cards/cover_0_0.png"/>'
			}
		}
	}
}

window.onclick = function () {
	console.log("click")
	updateOpenDeck()
	updateDeckCount()
}

var nextTurn = function () {
	window.game.cyclicIncrementCurrentPlayerIndex()
	window.game.currentAction = undefined;
	document.getElementById("finish-turn").style.visibility = 'hidden';
	updeteTurn()

	var currentPlayer = game.players[game.currentPlayerIndex];
	if (currentPlayer.isComputerPlayer == true) {
		//currentPlayer.play();
	}
}

function changeColor(color) {
	document.getElementById('change-color-modal').style.display = "none";
	window.game.currentColor = color;
	updateColor()
	nextTurn()
}

var finishTurn = function () {
	if (window.game.openDeck.getTopCard().action != "stop")
		nextTurn()
	else
		document.getElementById("finish-turn").style.visibility = 'hidden';
}