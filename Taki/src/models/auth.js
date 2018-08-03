const roomsManager = require('./roomsManager');

const userList = {};

function userAuthentication(req, res, next) {		
	if (userList[req.session.id] === undefined) {				
		res.sendStatus(401);		
	} else {		
		next();
	}
}

function addUserToAuthList(req, res, next) {	
	if (userList[req.session.id] !== undefined) {
		res.status(403).send('user already exist');
	} else {
		if (req.body.toUpperCase() === 'COMPUTER') {
			res.status(403).send('user name already exist');
			return;
		}		
		for (sessionid in userList) {
			const name = userList[sessionid];
			if (name === req.body) {
				res.status(403).send('user name already exist');
				return;
			}
		}		
		userList[req.session.id] = req.body;
		roomsManager.addPlayer(req.body);
		next();
	}
}

function userAlreadyOnline(req) {
	if (userList[req.session.id] !== undefined)
		return true;

	return false;
}


function removeUserFromAuthList(req, res, next) {	
	if (userList[req.session.id] === undefined) {
		res.status(403).send('user does not exist');
	} else {						
		delete userList[req.session.id];
		next();
	}
}

function getUserInfo(id) {	
    return {name: userList[id]};
}

module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo, userAlreadyOnline}
