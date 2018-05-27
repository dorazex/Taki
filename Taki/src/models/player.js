import PlayerStatistics from './player_statistics';
import MoveGenerator from './move_generator';

function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;
    this.statistics = new PlayerStatistics();
    this.moveGenerator = new MoveGenerator();

    this.addCards = function (cards) {
        this.cards = this.cards.concat(cards);
    };

    this.computerPlay = function (topCard, currentColor, action, plus2) {
        var res = this.moveGenerator.play(this.cards, topCard, currentColor, action, plus2);
        return res;
    }
};

export default Player;