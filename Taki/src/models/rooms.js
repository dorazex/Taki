const express = require('express');
const roomsManager = require('./roomsManager');
const rooms = express.Router();
const bodyParser = require('body-parser');


rooms.use(bodyParser.json());

rooms.use(bodyParser.urlencoded({ extended: true }));

rooms.post('/createGame', (req, res) => {
	var all_rooms = roomsManager.getRoomList();

	for (var i = 0; i < all_rooms.length; i++) {
		if (all_rooms[i].getGameTitle() == req.body.gameTitle) {
			res.status(403).send("Game title already exist");
			return;
		}
	}

	if (req.body.totalPlayers < 2 || req.body.totalPlayers > 4) {
		res.status(403).send("Total players value must be between 2 to 4");
		return;
	}

	var game = new (require('./game.js'))(req.body.totalPlayers, 0);
	game.setOrganizer(req.body.organizer);
	game.setGameTitle(req.body.gameTitle);
	game.setTotalPlayers(req.body.totalPlayers);
	roomsManager.addGame(game);
});


rooms
	.get('/userList', (req, res) => {
		res.json(roomsManager.getPlayerList());
	});

rooms.get('/roomList', (req, res) => {
	res.json(roomsManager.getRoomList());
});

rooms.get('/enterRoom', (req, res, next) => {
	var roomid = req.query.roomid;
	var gameManager = roomsManager.getGames().get(roomId);

	var username = req.query.organizer;

	if (gameManager.checkUniqueUser(username)) {
		//user already exist, so can't register them, just let them go to their board
		res.status(403).send("You're already playing in this room.");
		return;
	}
	else {
		//user doesn't exist so register them
		if (gameManager.addPlayer(username)) {
			// room isn't full
			res.cookie('roomid', roomid); // so the client side will remember his room id after redirect
		}
		else if (gameManager.getGameRunning()) {
			res.status(403).send("Game is already running");
			return;
		}
		else {
			// room is full
			res.status(403).send("Room is full");
			return;
		}
	}

	next();
});

rooms.get('/logout', (req, res) => {
	var username = req.query.organizer;
	roomsManager.removePlayer(username);
	req.session.destroy();
	res.sendStatus(200);
});


module.exports = rooms;