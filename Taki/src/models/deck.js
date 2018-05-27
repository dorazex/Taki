import * as constants from './constants'
import * as utilities from './utilities'
import Card from './card';

function Deck() {
    ////////// private properties
    this.cards = [];

    ////////// private methods
    this.initCards = function() {
        // Cards that should have 2 occurences
        for (var k = 0; k < 2; k++) {
            var cards = this.cards
            // regular number cards
            constants.COLORS.forEach(function(color){
                    constants.NUMBERS.forEach(function(number){
                        cards.push(new Card(color, number, null));
                    });
                });
            // cards with colored action
            constants.COLORS.forEach(function(color){
                constants.ACTIONS_W_COLORS.forEach(
                    function(action){
                        cards.push(new Card(color, null, action));
                    });
            });
        };

        // Cards that should have 4 occurences
        for (var i = 0; i < 4; i++) {
            // action cards without colors
            constants.ACTIONS_WO_COLORS_4.forEach(function(action){
                cards.push(new Card(null, null, action));
            });
        };

         // Cards that should have 2 occurences
         for (var i = 0; i < 2; i++) {
            // action cards without colors
            constants.ACTIONS_WO_COLORS_2.forEach(function(action){
                cards.push(new Card(null, null, action));
            });
        };
    };

    ////////// public methods

    this.init = function () {
        this.initCards();
        utilities.shuffleArray(this.cards);
        return this.cards;
        
    };

    this.takeCards = function(numberOfCards){
        var takenCards = [];
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

export default Deck;