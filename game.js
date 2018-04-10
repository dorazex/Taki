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

		this.players = shuffleArray(this.players);

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
		//console.log(`changed player index to: ${this.currentPlayerIndex}`)
	};


	this.computerPlay = function () {
		var res = this.players[this.currentPlayerIndex].computerPlay(this.openDeck.getTopCard(), this.currentColor);

		for (var i = 0; i < res.length; i += 1) {
			this.openDeck.putCard(res[i][1]);
		}

		if (res.length == 0) {
			this.players[this.currentPlayerIndex].addCards(this.deck.takeCards(1));
			game.cyclicIncrementCurrentPlayerIndex()
		}
		else {
			if (res[res.length - 1][1].color != null) {
				this.currentColor = res[res.length - 1][1].color;
			}

			if (res[res.length - 1][1].action == "stop") {
				game.cyclicIncrementCurrentPlayerIndex()
				game.cyclicIncrementCurrentPlayerIndex()
			}
			else game.cyclicIncrementCurrentPlayerIndex()
		}

		return res;
	}

	this.pullCard = function () {
		if (this.players[this.currentPlayerIndex].isComputerPlayer == true)
			return false;
		if (this.currentAction == "taki") {
			this.message = "not enable pull card";
			return false;
		}
		this.players[window.game.currentPlayerIndex].addCards(this.deck.takeCards(1));
		game.cyclicIncrementCurrentPlayerIndex()
		return true;
	}

	this.finishTurn = function () {
		window.game.currentAction = undefined;
		if (game.openDeck.getTopCard().action != "stop")
			game.cyclicIncrementCurrentPlayerIndex()
		else {
			game.cyclicIncrementCurrentPlayerIndex()
			game.cyclicIncrementCurrentPlayerIndex()
		}
	}

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
				game.cyclicIncrementCurrentPlayerIndex()
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
				game.cyclicIncrementCurrentPlayerIndex()
				game.cyclicIncrementCurrentPlayerIndex()
			}
		}

		return true;
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
	updateOpenDeck()
	updateDeckCount()
	updateColor()
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

var activeCardOnClick = function (event) {
	cardDiv = event.path[1]
	playerDiv = event.path[2]
	var cardIndex = parseInt(cardDiv.id.split("-")[1])
	var playerIndex = parseInt(playerDiv.id.split("-")[2])
	var card = game.players[playerIndex].cards[cardIndex];
	var next = false;
	var res = game.play(card);

	document.getElementById("message").innerHTML = window.game.message;

	if (res == true) {
		updateColor();
		if (window.game.currentAction == "taki") {
			document.getElementById("finish-turn").style.visibility = 'visible';
		}

		playerDiv.removeChild(cardDiv)
		game.openDeck.putCard(game.players[playerIndex].cards[cardIndex])
		game.players[playerIndex].cards.splice(cardIndex, 1)
		updateOpenDeck()
		updateGameView()

		if (card.action == "changeColor") {
			document.getElementById('change-color-modal').style.display = "block";
		}
		else {
			nextTurn()
		}
	}
}


var updateTurn = function () {
	var turnOf = game.players[window.game.currentPlayerIndex].isComputerPlayer == true ? "Computer" : "Human";
	document.getElementById("turn").innerHTML = "Turn of " + turnOf;

	for (var i = 0; i < game.players.length; i++) {
		var playerDivId = `player-container-${i}`;
		var playerDiv = document.getElementById(playerDivId);
		var c = playerDiv.children;
		var j;
		for (j = 0; j < c.length; j++) {
			if (i == window.game.currentPlayerIndex)
				c[j].className -= "disabled";
			else c[j].className += "disabled";
		}
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
			var cardDivId = `card-${j}-player-${i}`
			var cardDiv = document.createElement("div")
			cardDiv.id = cardDivId
			playerDiv.appendChild(cardDiv);
			if (game.players[i].isComputerPlayer == false) {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
				cardDiv.addEventListener('click', activeCardOnClick)
			} else {
				var card = game.players[i].cards[j]
				cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
			}
		}
	}
}

window.onclick = function () {
//	console.log("click")
	updateDeckCount()
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

var nextTurn = function () {
	document.getElementById("message").innerHTML = "";
	updateTurn()
	playerIndex = window.game.currentPlayerIndex;
	var currentPlayer = game.players[playerIndex];
	console.log("turn of: " + playerIndex)
	

	var currentPlayer = game.players[playerIndex];
	if (currentPlayer.isComputerPlayer == true) {
		
		var playerDivId = `player-container-${playerIndex}`;
		var playerDiv = document.getElementById(playerDivId)
		var res = window.game.computerPlay();
		updateColor()

		// var i = 0;
		// function myLoop() {             
		// 	setTimeout(function () {    
		// 		console.log("2. " + playerIndex)
		// 		var cardDivId = `card-${res[i][0]}-player-${playerIndex}`
		// 		console.log(cardDivId)
		// 		console.log("i " + i)
		// 		var cardDiv = document.getElementById(cardDivId)
		// 		playerDiv.removeChild(cardDiv);
		// 		var openDeckDiv = document.getElementById("open-deck")
		// 		openDeckDiv.innerHTML = `<img src=\"cards/${res[i][1].getFileName()}\"/>`
		// 		i++;                    
		// 		if (i < res.length) {           
		// 			myLoop();             
		// 		}                       
		// 	}, 3000)
		// }

	//	myLoop()

		for (var i = 0; i < res.length; i += 1) {
			var cardDivId = `card-${res[i][0]}-player-${playerIndex}`
			var cardDiv = document.getElementById(cardDivId)
			playerDiv.removeChild(cardDiv);
			var openDeckDiv = document.getElementById("open-deck")
			openDeckDiv.innerHTML = `<img src=\"cards/${res[i][1].getFileName()}\"/>`
			sleep(3000)
		}
		if (res.length == 0) {
			var cardDivId = `card-${game.players[playerIndex].length}-player-${playerIndex}`
			var cardDiv = document.createElement("div")
			cardDiv.id = cardDivId
			playerDiv.appendChild(cardDiv);
		}
		updateGameView()
		nextTurn()
	}


}

function changeColor(color) {
	document.getElementById('change-color-modal').style.display = "none";
	window.game.currentColor = color;
	updateColor()
	window.game.cyclicIncrementCurrentPlayerIndex()
	nextTurn()
}

var finishTurnOnClick = function () {
	game.finishTurn()
	document.getElementById("finish-turn").style.visibility = 'hidden';
	nextTurn()
}

var pullCard = function () {
	res = window.game.pullCard();
	if (res == true) {
		updateGameView()
		nextTurn()
	} else {
		document.getElementById("message").innerHTML = window.game.message;
	}
}