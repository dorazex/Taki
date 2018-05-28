class GameCreator {
	static createGame(numRegularPlayers, numComputerPlayers) {	
		var game = new Game(numRegularPlayers, numComputerPlayers);
		game.init();
		game.players[game.currentPlayerIndex].statistics.startTurn();
	  return game;
	}

	static createStandardGame() {
		return this.createGame(1, 1);
	}
}
