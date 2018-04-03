

window.onload = function () {
    //test
    var deckOfCards = new deck();
    cards = deckOfCards.init();
    console.log(cards);

    var parent = document.getElementById("board");
    console.log(parent);


    var DOMaddCardImgToDiv = function(card){
	    var node = document.createElement("div");
	    var child = parent.appendChild(node);
	    console.log(child);
	    child.innerHTML = "<img src=\"cards/card0002.png\"/>"
	    child.addEventListener('click', function(){alert('asdasd')})
	};


    cards.forEach(DOMaddCardImgToDiv);

};