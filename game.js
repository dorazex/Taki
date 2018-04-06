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
	};

    this.init = function(){
    	console.log("creating deck")
  		this.deck = new deck();
  		console.log("finished creating deck")
  		console.log(this.deck)
    	console.log("initializing deck")
	    this.deck.init();
  		console.log("finished initializing deck")
	    console.log("initializing deck")

	    this.initPlayers();


	    console.log(cards.length)
	    playerCards = deckOfCards.takeCards(NUM_INITIAL_CARDS);
	    console.log(playerCards.length)
	    computerCards = deckOfCards.takeCards(NUM_INITIAL_CARDS);
	    console.log(computerCards.length)
	    console.log(cards.length)
	    deckOfCards.returnCards(computerCards);
	    console.log(cards.length)
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
}

// window.onload = function () {
//     // init
//     var game = new Game();
//     game.init();


    
//     var DOMaddCardImgToDiv = function(card){
// 	    var node = document.createElement("div");
// 	    var child = parent.appendChild(node);
// 	    // console.log(child);
// 	    child.innerHTML = `<img src=\"cards/${card.getFileName()}\"/>`
// 	    child.addEventListener('click', function(event){
// 	    	if (null == takeCardFromCardsArrayByFileName(playerCards, card.getFileName())){
// 	    		console.log("Card Not Found");
// 	    	} else{
// 	    		parent.removeChild(child);
// 	    	}
// 	    	console.log(event);
// 	    });
// 	    // console.log(card.getFileName());
// 	};

//     playerCards.forEach(DOMaddCardImgToDiv);

// };

