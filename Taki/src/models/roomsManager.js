const games = new Map();
const onlinePlayers = [];
var roomList = [];
var count = 0;

function checkUniqueUser(name) {
    for (const [count, game] of games.entries()) {
        if (game.checkUniqueUser(name) == false)
            return false;
    }

    return true;
}

function isPlayerExists(name) {
    for (player in onlinePlayers) {
        if (player.name == name) {
            return true;
        }
    }
    return fasle;
}

function addGame(game) {
    count++;
    games.set(count.toString(), game);
    game.roomInfo.setRoomIdentifier(count);
    roomList.push(game.roomInfo);
}


function removePlayer(organizer) {
    if(checkUniqueUser(organizer) == false)
      return false;

    for (var i = onlinePlayers.length - 1; i >= 0; i--) {
        if (onlinePlayers[i].name == organizer) {
            onlinePlayers.splice(i, 1);
        }
    }

    return true;
}


function addPlayer(name) {
    const simplePlayer = new (require('./simple-player.js'))(name);
    onlinePlayers.push(simplePlayer);
}

function getGames() { return games; }

function getPlayerList() { return onlinePlayers; }

function getRoomList() { return roomList; }

module.exports = { isPlayerExists, addGame, removePlayer, addPlayer, getGames, getPlayerList, getRoomList, checkUniqueUser }