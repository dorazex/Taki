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

function Deck() {
    this.cards = [];

    this.getNumberOfCards = function(){
        return this.cards.length;
    }
};

function OpenDeck() {
    this.cards = [];

    this.getTopCard = function(){
        return this.cards[this.cards.length - 1]
    };
};

export default function UndoFrame(game) {
    
   

    this.players = [];

    this.player1 = new Player(game.players[0].isComputerPlayer);
    this.player1.cards =  game.players[0].cards.slice();
    this.player1.statistics.avgTurnsDurationsCurrentGame =  game.players[0].statistics.avgTurnsDurationsCurrentGame;
    this.player1.statistics.avgTurnsDurationsAllGames =  game.players[0].statistics.avgTurnsDurationsAllGames;
    this.player1.statistics.singleCardCount =  game.players[0].statistics.singleCardCount;
    this.players.push(this.player1);

    this.player2 = new Player( game.players[1].isComputerPlayer);
    this.player2.cards =  game.players[1].cards.slice();
    this.player2.statistics.avgTurnsDurationsCurrentGame =  game.players[1].statistics.avgTurnsDurationsCurrentGame;
    this.player2.statistics.avgTurnsDurationsAllGames =  game.players[1].statistics.avgTurnsDurationsAllGames;
    this.player2.statistics.singleCardCount =  game.players[1].statistics.singleCardCount;
    this.players.push(this.player2);


    this.currentPlayerIndex = game.currentPlayerIndex;
    this.currentColor = game.currentColor;
    this.message = game.message;
    this.statistics = new GameStatistics(game.statistics.turnsCount, game.statistics.getGameDuration());

    this.deck = new Deck();
    this.openDeck = new OpenDeck();
    
    this.deck.cards = game.deck.cards.slice();
    this.openDeck.cards = game.openDeck.cards.slice();

    // console.log(this.player1Game.cards.slice());
    // console.log(this.player2Game.cards.slice());
    // console.log(this.player1.cards.slice());
    // console.log(this.player2.cards.slice());
};







