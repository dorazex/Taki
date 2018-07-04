//simplified game info for converting to json

class RoomInfo {
    constructor() {
        this.roomIdentifier = undefined;
        this.gameTitle = undefined;
        this.organizer = undefined;
        this.totalPlayers = undefined;
        this.onlinePlayers = 0;
        this.startGame = false;
    }

    clearInfo() {
        this.onlinePlayers = 0;
        this.startGame = false;
    }

    setRoomIdentifier(roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }

    getOrganizer() {
        return this.organizer;
    }

    setOrganizer(organizer) {
        this.organizer = organizer;
    }

    getGameTitle() {
        return this.gameTitle;
    }

    setGameTitle(gameTitle) {
        this.gameTitle = gameTitle;
    }

    getTotalPlayers() {
        return this.totalPlayers;
    }

    setTotalPlayers(totalPlayers) {
        this.totalPlayers = totalPlayers;
    }

    getOnlinePlayers() {
        return this.onlinePlayers;
    }

    setOnlinePlayers(onlinePlayers) {
        this.onlinePlayers = onlinePlayers;
    }

    increaseOnlinePlayers() {
        this.onlinePlayers++;
    }

    decreaseOnlinePlayers() {
        this.onlinePlayers--;
    }
}

module.exports = RoomInfo;


