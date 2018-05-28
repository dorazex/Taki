//this is the memento part of the memento design pattern for undo and redo
//holds the state before the undo or redo
 
function UndoFrame(deckCount, topCard, color, turnOf, firstPlayerCards, secondPlayerCards, statisticsPlayer, turnsCount, gameDuration) {
    this.deckCount = deckCount;
    this.topCard = topCard;
    this.color = color;
    this.turnOf = turnOf;
    this.firstPlayerCards = firstPlayerCards.slice();
    this.secondPlayerCards = secondPlayerCards.slice();
    this.statisticsPlayer = statisticsPlayer;
    this.turnsCount = turnsCount;
    this.gameDuration = gameDuration;
 };
