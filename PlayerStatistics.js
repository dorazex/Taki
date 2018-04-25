function PlayerStatistics() {
	this.currentTurnStart = 0;
	this.turnsDurations = [];
	this.singleCardCount = 0;

	this.startTurn = function(){
		this.currentTurnStart = new Date().getTime();
	}

	this.endTurn = function(){
		var endTime = new Date().getTime();
		this.turnsDurations.push(endTime - this.currentTurnStart);
	}

	this.getAverageTurnTime = function(){
		var sum = this.turnsDurations.reduce(function(a, b) { return a + b; });
		var avg = sum / this.turnsDurations.length;
		return avg;
	}
}