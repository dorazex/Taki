const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const rooms = require('./models/rooms');
const userManagement = require('./models/userManagement');
const gameServer = require('./models/gameServer');
const app = express();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 269999999999 }, resave: true, saveUninitialized: true }));

app.use(bodyParser.text());

app.use(bodyParser.json({ type: 'application/json' }))

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('public'));

app.use(express.static(path.resolve(__dirname, "..", "public")));

// app.get('/',auth.userAuthentication, (req, res, next) => {		
// 	console.log('root', req.session.id);	
// 	next();
// })

app.use('/rooms', rooms);
app.use('/users', userManagement);
app.use('/game', gameServer);

app.listen(3000, console.log('Example app listening on port 3000!'));