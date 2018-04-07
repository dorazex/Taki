function Game(numRegularPlayers, numComputerPlayers) {
	this.deck = [];
	this.openDeck = [];
	this.players = [];
	this.currentPlayerIndex = 0;
	this.NUM_REGULAR_PLAYERS = numRegularPlayers;
	this.NUM_COMPUTER_PLAYERS = numComputerPlayers;

	this.addPlayer = function(isComputerPlayer){
		this.players.push(new Player(isComputerPlayer))
	};

	this.initPlayers = function(){
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

    this.init = function(){
  		this.deck = new Deck();
	    this.deck.init();
	    this.openDeck = new openDeck();
	    this.initPlayers();

	    do {
    		this.openDeck.putCard(this.deck.takeCards(1)[0])
	    } while (!this.openDeck.getTopCard().isValidStartCard())
  };
};


window.onload = function(){
	url = window.location.href
	urlParameters = url.split("?")[1]
	numRegularPlayers = parseInt(urlParameters.split("&")[0].split("=")[1])
	numComputerPlayers = parseInt(urlParameters.split("&")[1].split("=")[1])

    // init
    var game = new Game(numRegularPlayers, numComputerPlayers);
    game.init();
    window.game = game

    var gameDiv = document.getElementById("game");
	for (var i = 0; i < game.players.length; i++) {
		playerDiv = document.createElement("div")
		playerDiv.className = "player-cards-flex-container";
		playerDiv.id = `player-container-${i}`
		gameDiv.appendChild(playerDiv);
		
		for (var j = 0; j < game.players[i].cards.length; j++) {
			var cardDiv = document.createElement("div")
			card = game.players[i].cards[j]
			cardDiv.id = `card-${j}`
			cardDiv.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
			cardDiv.addEventListener('click', function(event){
				cardDiv = event.path[1]
				playerDiv = event.path[2]
				var cardIndex = parseInt(cardDiv.id.split("-")[1])
				var playerIndex = parseInt(playerDiv.id.split("-")[2])
				if (game.players[playerIndex].cards[cardIndex] == undefined){
					var a = 0;
				}
				playerDiv.removeChild(cardDiv)
				game.openDeck.putCard(game.players[playerIndex].cards[cardIndex])
				var card = game.players[playerIndex].cards[cardIndex] = undefined
			})
			playerDiv.appendChild(cardDiv);
		}
	}
	updateOpenDeck()
	updateDeckCount()
}

var updateOpenDeck = function(){
	var openDeckDiv = document.getElementById("open-deck")
	openDeckDiv.innerHTML = `<img src=\"cards/${window.game.openDeck.getTopCard().getFileName()}\"/>`
}

var updateDeckCount = function(){
	var deckTextDiv = document.getElementById("deck-text")
	deckTextDiv.innerHTML = `${game.deck.getNumberOfCards()}`
}

window.onclick = function(){
	console.log("click")
	updateOpenDeck()
	updateDeckCount()
}