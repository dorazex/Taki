import Game from './game';

export default class GameFactory {
	static createGame(numRegularPlayers, numComputerPlayers) {	
		var game = new Game(numRegularPlayers, numComputerPlayers);
		game.init();
		game.players[game.currentPlayerIndex].statistics.startTurn();
	  return game;
	}

	static createGameOneOnOne() {
		return this.createGame(1, 1);
	}
}
