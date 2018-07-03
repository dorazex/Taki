//import SimplePlayer from './simple-player';

const games = new Map();
const onlinePlayers = [];
var roomList = [];
var count = 0;


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
    games.set(count, game);
    game.roomInfo.setRoomIdentifier(count);
    roomList.push(game.roomInfo);
}


function removePlayer(organizer) {
    for (var i = onlinePlayers.length - 1; i >= 0; i--) {
        if (onlinePlayers[i].name == organizer) {
            array.splice(i, 1);
            return;
        }
    }
}


function addPlayer(name) {
    const simplePlayer = new (require('./simple-player.js'))(name);
    onlinePlayers.push(simplePlayer);
}

function getGames() { return games; }

function getPlayerList() { return onlinePlayers; }

function getRoomList() { return roomList; }

module.exports = {isPlayerExists, addGame, removePlayer, addPlayer, getGames, getPlayerList, getRoomList}








  // this.isPlayerExists = function (name, type) {
    //     for (player in this.onlinePlayers) {
    //         if (player.name == name && player.type == type)
    //             return true;
    //     }
    //     return false;
    // }





//     @Override
//     public void contextInitialized(ServletContextEvent servletContextEvent) {
//         servletContextEvent.getServletContext().setAttribute("RoomsManager", this);
//     }

//     @Override
//     public void contextDestroyed(ServletContextEvent servletContextEvent) {
//         computerMoveExecutor.shutdown();
//         computerMoveExecutor.shutdownNow(); //clean up for the executor service when server is shutting down
//     }
// }
