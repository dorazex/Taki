

window.onload = function () {
    //test
    var deckOfCards = new deck();
    cards = deckOfCards.init();
    console.log(cards);

    var parent = document.getElementById("player-bottom-flex-container");
    console.log(parent);

    console.log(cards.length)
    playerCards = cards.slice(76);
    console.log(playerCards.length)
    computerCards = cards.slice(68,76);
    console.log(computerCards.length)
    cards = cards.slice(0,68);
    console.log(cards.length)


    var DOMaddCardImgToDiv = function(card){
	    var node = document.createElement("div");
	    var child = parent.appendChild(node);
	    // console.log(child);
	    child.innerHTML = "<img src=\"cards/" + card.getFileName() + " \"/>"
	    child.addEventListener('click', function(){alert('asdasd')})
	    // console.log(card.getFileName());
	};


    playerCards.forEach(DOMaddCardImgToDiv);

};