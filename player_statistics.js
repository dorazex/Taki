function PlayerStatistics() {
	this.currentTurnStart = 0;
	this.turnsDurations = [];
	this.singleCardCount = 0;

	this.startTurn = function(){
		this.currentTurnStart = new Date().getTime();
		console.log("turn started")
	}

	this.endTurn = function(){
		var endTime = new Date().getTime();
		this.turnsDurations.push(endTime - this.currentTurnStart);
		console.log("turn ended")
		console.log("average: " + this.getAverageTurnTime())
	}

	this.getAverageTurnTime = function(){
		if (this.turnsDurations.length == 0) return 0;
		var sum = this.turnsDurations.reduce(function(a, b) { return a + b; });
		var avg = sum / this.turnsDurations.length;
		return avg;
	}
}