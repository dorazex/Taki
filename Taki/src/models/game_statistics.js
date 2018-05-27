function GameStatistics() {
	this.turnsCount = 0;
	this.startTime = new Date().getTime();

	this.getGameDuration = function(){
		var currentTime = new Date().getTime();
		return (currentTime - this.startTime);
	}
}

export default GameStatistics;