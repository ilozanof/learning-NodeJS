/**
 * Implementation of the Chat Server using Javascript ES05
 */
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

function listen(server) {
    io = socketio.listen(server);
    io.sockets.on('connection', function (socket) {
    
        // We assign the guestName...
        var guestName = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        guestNumber++;
    
        // We broadcast the message...
        handleMessageBroadcasting(socket);

    });
}

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        console.log('message received: ' + message.text);
        io.sockets.emit('message', {
            text: nickNames[socket.id] + ":" + message.text
        });
    });
}

module.exports = {
    listen: listen
}