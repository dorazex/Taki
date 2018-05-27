function OpenDeck() {
    ////////// private properties
    this.cards = [];

    ////////// private methods

    ////////// public methods

    this.putCard = function(card){
        this.cards.push(card)
    };

    this.getTopCard = function(){
        return this.cards[this.cards.length - 1]
    };

    this.getNumberOfCards = function(){
        return cards.length;
    };
};

export default OpenDeck;