import * as socketio from 'socket.io';

/**
 * Chat Server
 * 
 * Implementation of a basic Chat server. It only implements the broadcast of the
 * messages to all the sockets, but the one sending it.
 * 
 * IMPORTANT NOTES:
 * When instances of this class are used in callback functions, there wil problmes with the
 * "this" reference, when one method class another one within the same class. That is not
 * happeing here, but please check out the "httpServer.js" lass for a reference of the 
 * problem.
 */
export default class ChatServer {
    constructor(server) {
        this.server = server;
        this.io = null;
        this.guestNumber = 1;
        this.nickNames = {};
        this.namesUsed = [];
        this.currentRoom = {};
    }

    start() {
        this.io = socketio.listen(this.server);
        var that = this;
        this.io.sockets.on('connection', function (socket) {
            // We assign the guestName...
            var guestName = that.assignGuestName(socket, that.guestNumber);
            that.guestNumber++;
        
            // We broadcast the message...
            that.handleMessageBroadcasting(socket);
        })
    }

    assignGuestName(socket, guestNumber) {
        var name = 'Guest' + guestNumber;
        this.nickNames[socket.id] = name;
        socket.emit('nameResult', {
               success: true,
               name: name
        });
        this.namesUsed.push(name);
        return guestNumber + 1;
        }

    handleMessageBroadcasting(socket) {
        var that = this;
            socket.on('message', function (message) {
                console.log('message received: ' + message.text);
                that.io.sockets.emit('message', {
                    text: that.nickNames[socket.id] + ":" + message.text
                });
            });
        }
}

