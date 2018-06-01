//this is the memento part of the memento design pattern for undo and redo
//holds the state before the undo or redo

function PlayerStatistics() {
    this.currentTurnStart = 0;
    this.singleCardCount = 0;
    this.avgTurnsDurationsCurrentGame = 0;
    this.avgTurnsDurationsAllGames = 0;
    this.numOfTurnsCurrentGame = 0;
    this.numOfTurnsAllGames = 0;
}

function Player(isComputerPlayer) {
    this.cards = [];
    this.isComputerPlayer = isComputerPlayer;
    this.statistics = new PlayerStatistics();
}

function GameStatistics(turnsCount, gameDuration) {
    this.turnsCount = turnsCount;
    this.gameDuration = gameDuration;

    this.getGameDuration = function () {
        return this.gameDuration;
    }
}

function OpenDeck() {
    this.cards = [];

    this.getTopCard = function(){
        return this.cards[this.cards.length - 1]
    };
};
this.deck = new Deck();
		this.deck.init();
		this.openDeck = new openDeck();


function Deck() {
    this.cards = [];

    this.getNumberOfCards = function(){
        return this.cards.length;
    }
};

function UndoFrame(game) {
    var player1Game = game.players[0];
    var player2Game = game.players[1];

    this.players = [];

    var player1 = new Player(player1Game.isComputer);
    player1.cards = player1Game.cards.slice();
    player1.statistics.avgTurnsDurationsCurrentGame = player1Game.statistics.avgTurnsDurationsCurrentGame;
    player1.statistics.avgTurnsDurationsAllGames = player1Game.statistics.avgTurnsDurationsAllGames;
    player1.statistics.singleCardCount = player1Game.statistics.singleCardCount;
    this.players.push(player1);

    var player2 = new Player(player2Game.isComputer);
    player2.cards = player2Game.cards.slice();
    player2.statistics.avgTurnsDurationsCurrentGame = player2Game.statistics.avgTurnsDurationsCurrentGame;
    player2.statistics.avgTurnsDurationsAllGames = player2Game.statistics.avgTurnsDurationsAllGames;
    player2.statistics.singleCardCount = player2Game.statistics.singleCardCount;
    this.players.push(player2);

    this.currentPlayerIndex = game.currentPlayerIndex;
    this.currentColor = game.currentColor;
    this.message = game.message;
    this.statistics = new GameStatistics(game.statistics.turnsCount, game.statistics.getGameDuration());
};

export default UndoFrame;





