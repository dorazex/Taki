const express = require('express');
const roomsManager = require('./roomsManager');
const rooms = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

rooms.use(cookieParser());

rooms.use(bodyParser.json());

rooms.use(bodyParser.urlencoded({ extended: true }));

rooms.post('/createGame', (req, res) => {
	var all_rooms = roomsManager.getRoomList();

	for (var i = 0; i < all_rooms.length; i++) {
		if (all_rooms[i].getGameTitle() == req.body.gameTitle) {
			res.status(403).json({ message: "Game title already exist" });
			return;
		}
	}

	if (req.body.totalPlayers < 2 || req.body.totalPlayers > 4) {
		res.status(403).json({ message: "Total players value must be between 2 to 4" });
		return;
	}

	var game = new (require('./game.js'))(req.body.totalPlayers, 0);
	game.init();
	game.setOrganizer(req.cookies.organizer);
	game.setGameTitle(req.body.gameTitle);
	game.setTotalPlayers(req.body.totalPlayers);
	roomsManager.addGame(game);
});


rooms.get('/userList', (req, res) => {
	res.json(roomsManager.getPlayerList());
});

rooms.get('/roomList', (req, res) => {
	res.json(roomsManager.getRoomList());
});


//TODO: user can play in one room
rooms.post('/enterRoom', (req, res) => {
	var roomid = req.body.roomid;
	var gameManager = roomsManager.getGames().get(roomid.toString());
	var username = req.cookies.organizer;

	if (roomsManager.checkUniqueUser(username) == false) {
		//user already exist, so can't register them, just let them go to their game
		res.status(403).json({ message: "You're already playing." });
		return;
	}
	else {
		//user doesn't exist so register them
		if (gameManager.addPlayer(username)) {
			// room isn't full
			res.cookie('roomid', roomid, { maxAge: 900000, httpOnly: true }); // so the client side will remember his room id after redirect
			res.sendStatus(200);
		}
		else if (gameManager.getGameRunning()) {
			res.status(403).json({ message: "Game is already running" });
			return;
		}
		else {
			// room is full
			res.status(403).json({ message: "Room is full" });
			return;
		}
	}
});

rooms.get('/logout', (req, res) => {
	var username = req.query.organizer;
	roomsManager.removePlayer(username);
	req.session.destroy();
	res.sendStatus(200);
});


module.exports = rooms;