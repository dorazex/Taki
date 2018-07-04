class OpenDeck {
    constructor() {
        this.cards = [];
    }

    putCard(card) {
        this.cards.push(card)
    }

    getTopCard() {
        return this.cards[this.cards.length - 1]
    }

    getNumberOfCards() {
        return cards.length;
    }
}

module.exports = OpenDeck;