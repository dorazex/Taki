class GameStatistics {
	constructor() {
		this.turnsCount = 1;
		this.startTime = 0;
	}

	getGameDuration() {
		var currentTime = new Date().getTime();
		return (currentTime - this.startTime);
	}
}

module.exports = GameStatistics;