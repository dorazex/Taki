const express = require('express');
const roomsManager = require('./roomsManager');
const gameServer = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

gameServer.use(cookieParser());

gameServer.use(bodyParser.json());

gameServer.use(bodyParser.urlencoded({ extended: true }));

gameServer.get('/currentPlayerName', (req, res) => {
    var roomid = req.cookies.roomid;
    var gameManager = roomsManager.getGames().get(roomid.toString());
    res.json(gameManager.getCurrentPlayerName());
});

gameServer.get('/players', (req, res) => {
    var roomid = req.cookies.roomid;
    var gameManager = roomsManager.getGames().get(roomid.toString());
    res.json(gameManager.players);
});

gameServer.get('/checkGameStart', (req, res) => {
    var roomid = req.cookies.roomid;
    var gameManager = roomsManager.getGames().get(roomid.toString());
    res.status(200).json({ gameRunning: gameManager.getGameRunning() });
});

gameServer.get('/statusGame', (req, res) => {
    var username = req.cookies.organizer;
    var roomid = req.cookies.roomid;
    var gameManager = roomsManager.getGames().get(roomid.toString());
    var gameRunning = gameManager.getGameRunning();
    var turnOf = gameManager.turnOf();

    res.json({
        gameRunning: gameRunning,
        turnOf: turnOf,
        currentColor: gameManager.currentColor,
        turnsCount: gameManager.statistics.turnsCount,
        gameDuration: gameRunning ? gameManager.statistics.getGameDuration() : 0,
        avgTurnsDurationsCurrentGame: gameManager.avgTurnsDurationsCurrentGame(username),
        singleCardCount: gameManager.singleCardCount(username),
        message: turnOf == username ? gameManager.message : ''
    });
});


module.exports = gameServer;