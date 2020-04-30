// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var logger   = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var back = require('express-back');
var http = require('http').Server(app);
var io = require('socket.io')(http);


var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});







//var roomno = 1;
//io.on('connection', function(socket) {
   
   //Increase roomno 2 clients are present in a room.
   //if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
   //socket.join("room-"+roomno);

   //Send this event to everyone in the room.
  // io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
//})

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {

	// set up our express application
	app.use(logger('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({
        extended : false
    })); // get information from html forms
    app.use(bodyParser.json());
    app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({ 
        secret: 'iamthewalrus',
        resave:  true,
        saveUninitialized: true
        
    })); // session secret
    app.use(back());
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

};

// routes ======================================================================
require('./app/passroutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/addgod.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/gameroutes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
http.listen(port);
console.log('OldManZ up : ' + port);
