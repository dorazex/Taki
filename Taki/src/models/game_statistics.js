function GameStatistics() {
	this.turnsCount = 1;
	this.startTime = new Date().getTime();

	this.getGameDuration = function(){
		var currentTime = new Date().getTime();
		return (currentTime - this.startTime);
	}
}

export default GameStatistics;