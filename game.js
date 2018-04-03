

window.onload = function () {
    //test
    var deckOfCards = new deck();
    cards = deckOfCards.init();

    var parent = document.getElementById("player-bottom-flex-container");
    console.log(parent);

    console.log(cards.length)
    playerCards = deckOfCards.takeCards(8);
    console.log(playerCards.length)
    computerCards = deckOfCards.takeCards(8);
    console.log(computerCards.length)
    console.log(cards.length)
    deckOfCards.returnCards(computerCards);
    console.log(cards.length)


    var DOMaddCardImgToDiv = function(card){
	    var node = document.createElement("div");
	    var child = parent.appendChild(node);
	    // console.log(child);
	    child.innerHTML = "<img src=\"cards/" + card.getFileName() + " \"/>"
	    child.addEventListener('click', function(event){
	    	if (null == takeCardFromCardsArrayByFileName(playerCards, card.getFileName())){
	    		console.log("Card Not Found");
	    	} else{
	    		child.innerHTML = "";
	    	}
	    	console.log(event);
	    });
	    // console.log(card.getFileName());
	};


    playerCards.forEach(DOMaddCardImgToDiv);

};