function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;

    this.addCards = function (cards) {
        this.cards = this.cards.concat(cards);
    };

    this.play = function (topCard) {
        cards.forEach(function (card) {
           if(card.action == "changeColor") {
               
           }
        });

    }
};