class PlayerStatistics {
	constructor() {
		this.currentTurnStart = 0;
		this.singleCardCount = 0;
		this.avgTurnsDurationsCurrentGame = 0;
		this.numOfTurnsCurrentGame = 0;
	}

	startTurn() {
		this.currentTurnStart = new Date().getTime();
	}

	endTurn(cardsCountAfterTurn) {
		if (cardsCountAfterTurn == 1)
			this.singleCardCount++;

		var endTime = new Date().getTime();
		var duration = endTime - this.currentTurnStart;

		this.avgTurnsDurationsCurrentGame = (this.avgTurnsDurationsCurrentGame * this.numOfTurnsCurrentGame + duration) / ++this.numOfTurnsCurrentGame;
	}
}

module.exports = PlayerStatistics;
