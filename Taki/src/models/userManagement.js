const express = require('express');
const auth = require('./auth');
const userManagement = express.Router();
const cookieParser = require('cookie-parser');

userManagement.use(cookieParser());

userManagement.get('/', auth.userAuthentication, (req, res) => {
	const userName = auth.getUserInfo(req.session.id).name;
	res.json({name:userName});
});

userManagement.get('/allUsers', auth.userAuthentication, (req, res) => {	
	res.json(userList);
});

userManagement.post('/addUser', auth.addUserToAuthList, (req, res) => {	
	res.cookie('organizer', req.body, { maxAge: 900000, httpOnly: true });	
	res.sendStatus(200);	
});

// userManagement.get('/logout', [
// 	(req, res, next) => {	
// 		const userinfo = auth.getUserInfo(req.session.id);	
// 		chatManagement.appendUserLogoutMessage(userinfo);
// 		next();
// 	}, 
// 	auth.removeUserFromAuthList, 
// 	(req, res) => {
// 		res.sendStatus(200);		
// 	}]
// );


module.exports = userManagement;