const constants = require('./constants');
const utilities = require('./utilities');

class Deck {
    constructor() {
        this.cards = [];
    }

    initCards() {
        // Cards that should have 2 occurences
        for (var k = 0; k < 2; k++) {
            var cards = this.cards
            // regular number cards
            constants.COLORS.forEach(function (color) {
                constants.NUMBERS.forEach(function (number) {
                    cards.push(new (require('./card.js'))(color, number, null));
                });
            });
            // cards with colored action
            constants.COLORS.forEach(function (color) {
                constants.ACTIONS_W_COLORS.forEach(
                    function (action) {
                        cards.push(new (require('./card.js'))(color, null, action));
                    });
            });
        };

        // Cards that should have 4 occurences
        for (var i = 0; i < 4; i++) {
            // action cards without colors
            constants.ACTIONS_WO_COLORS_4.forEach(function (action) {
                cards.push(new (require('./card.js'))(null, null, action));
            });
        };

        // Cards that should have 2 occurences
        for (var i = 0; i < 2; i++) {
            // action cards without colors
            constants.ACTIONS_WO_COLORS_2.forEach(function (action) {
                cards.push(new (require('./card.js'))(null, null, action));
            });
        };
    };


    init() {
        this.initCards();
        utilities.shuffleArray(this.cards);
        return this.cards;

    };

    takeCards(numberOfCards) {
        var takenCards = [];
        for (var i = 0; i < numberOfCards; i++) {
            takenCards.push(this.cards.pop());
        };
        return takenCards;
    };

    returnCards(cardsToReturn) {
        while (cardsToReturn.length > 0) {
            this.cards.push(cardsToReturn.pop());
        };
    };

    getNumberOfCards() {
        return this.cards.length;
    }
}

module.exports = Deck;