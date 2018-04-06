function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;

    this.addCards = function(cards){
    	this.cards.push.apply(cards);
    };
};