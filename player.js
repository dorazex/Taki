function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;
    this.statistics = new PlayerStatistics();
    this.moveGenerator = new MoveGenerator();

    this.addCards = function (cards) {
        this.cards = this.cards.concat(cards);
    };

    this.computerPlay = function (topCard, currentColor, action) {
        var res = this.moveGenerator.play(this.cards, topCard, currentColor, action);
        return res;
    }
};