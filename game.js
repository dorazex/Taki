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
  		this.deck = new deck();
	    this.deck.init();

	    this.initPlayers();
  };
};


window.onload = function(){
	url = window.location.href
	console.log(url)
	urlParameters = url.split("?")[1]
	numRegularPlayers = parseInt(urlParameters.split("&")[0].split("=")[1])
	numComputerPlayers = parseInt(urlParameters.split("&")[1].split("=")[1])

    // init
    var game = new Game(numRegularPlayers, numComputerPlayers);
    game.init();

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
				game.players[playerIndex].cards.splice(cardIndex, 1)
				playerDiv.removeChild(cardDiv)
			})
			playerDiv.appendChild(cardDiv);
		}
	}
}

// window.onload = function () {
//     // init
//     var game = new Game();
//     game.init();


    

// };

