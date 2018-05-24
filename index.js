// Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 3).
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var push = require('push.js');

// We set the static path for public files, such as media and stylesheets
app.use(express.static('public'));

// We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// We create the Socket.io connection and log to the console for debugging
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    // print out the chat message event
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
    
});

// We make the http server listen on port 3000.
http.listen(3000, function(){
    console.log('listening on *:3000');
});

