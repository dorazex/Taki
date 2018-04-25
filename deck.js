function Deck() {
    ////////// private properties
    this.cards = [];

    ////////// private methods
    this.initCards = function() {
        // Cards that should have 2 occurences
        for (var k = 0; k < 2; k++) {
            var cards = this.cards
            // regular number cards
            COLORS.forEach(function(color){
                    NUMBERS.forEach(function(number){
                        cards.push(new Card(color, number, null));
                    });
                });
            // cards with colored action
            COLORS.forEach(function(color){
                ACTIONS_W_COLORS.forEach(
                    function(action){
                        cards.push(new Card(color, null, action));
                    });
            });
        };

        // Cards that should have 4 occurences
        for (var i = 0; i < 4; i++) {
            // action cards without colors
            ACTIONS_WO_COLORS.forEach(function(action){
                cards.push(new Card(null, null, action));
            });
        };
    };

    ////////// public methods

    this.init = function () {
        this.initCards();
        shuffleArray(this.cards);
        return this.cards;
        
    };

    this.takeCards = function(numberOfCards){
        takenCards = [];
        for (var i =0; i < numberOfCards; i++){
            takenCards.push(this.cards.pop());
        };
        return takenCards;
    };

    this.returnCards = function(cardsToReturn){
        while (cardsToReturn.length > 0){
            this.cards.push(cardsToReturn.pop());
        };
    };

    this.getNumberOfCards = function(){
        return this.cards.length;
    }
};
