class GameStatistics {
	constructor() {
		this.turnsCount = 1;
		this.startTime = 0;
		this.gameDuration = 0;
	}

	getGameDuration(finishGame) {
		if (finishGame == false) {
			var currentTime = new Date().getTime();
			this.gameDuration = currentTime - this.startTime;
		}

		return this.gameDuration;
	}
}

module.exports = GameStatistics;