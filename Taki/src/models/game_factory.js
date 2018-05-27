import Game from './game';

export default class GameFactory {
	static createGame(numRegularPlayers, numComputerPlayers) {	
		var game = new Game(numRegularPlayers, numComputerPlayers);
		game.init();
		// document.getElementById("finish-turn").style.visibility = 'hidden';
		// updateGameView()
		// updateStatistics()
		game.players[game.currentPlayerIndex].statistics.startTurn();
		// nextTurn()
	  return game;
	}

	static createGameOneOnOne() {
		return this.createGame(1, 1);
	}
}
