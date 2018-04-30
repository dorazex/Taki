function PlayerStatistics() {
	this.currentTurnStart = 0;
	//this.turnsDurations = [];
	this.singleCardCount = 0;

	this.avgTurnsDurationsCurrentGame = 0;
	this.avgTurnsDurationsAllGames = 0;
	this.numOfTurnsCurrentGame = 0;
	this.numOfTurnsAllGames = 0;
	
	this.startTurn = function () {
		this.currentTurnStart = new Date().getTime();
		// console.log("turn started")
	}

	this.endTurn = function (cardsCountAfterTurn) {
		if (cardsCountAfterTurn == 1)
			this.singleCardCount++;

		var endTime = new Date().getTime();
		var duration = endTime - this.currentTurnStart;
	
		this.avgTurnsDurationsCurrentGame = (this.avgTurnsDurationsCurrentGame * this.numOfTurnsCurrentGame + duration) / ++this.numOfTurnsCurrentGame;
		this.avgTurnsDurationsAllGames = (this.avgTurnsDurationsAllGames * this.numOfTurnsAllGames + duration) / ++this.numOfTurnsAllGames;
		
	
		// console.log("turn ended")
		// console.log("average: " + this.getAverageTurnTime())
	}

	// this.getAverageTurnTime = function () {
	// 	if (this.turnsDurations.length == 0) return 0;
	// 	var sum = this.turnsDurations.reduce(function (a, b) { return a + b; });
	// 	var avg = sum / this.turnsDurations.length;
	// 	return avg;
	// }
}