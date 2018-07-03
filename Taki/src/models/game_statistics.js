class GameStatistics {
	constructor() {
		this.turnsCount = 1;
		this.startTime = new Date().getTime();
	}

	getGameDuration() {
		var currentTime = new Date().getTime();
		return (currentTime - this.startTime);
	}
}

module.exports = GameStatistics;