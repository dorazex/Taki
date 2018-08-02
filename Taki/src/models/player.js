class Player {
    constructor(name, isComputerPlayer) {
        this.cards = [];
        this.win = false;
        this.name = name;
        this.isComputerPlayer = isComputerPlayer;
        this.statistics = new (require('./player_statistics.js'))();
        this.moveGenerator = new (require('./move_generator.js'))();
    }

    addCards(cards) {
        this.cards = this.cards.concat(cards);
    }

    computerPlay(topCard, currentColor, action, plus2) {
        var res = this.moveGenerator.play(this.cards, topCard, currentColor, action, plus2);
        return res;
    }
}

module.exports = Player;
