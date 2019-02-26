
var Chat = function(socket) {
    this.socket = socket;
    socket.on('message', function(message) {
        var newHTMLElement = $('<div></div>').text(message.text);
        $('#messages').append(newHTMLElement);
    });
}

Chat.prototype.sendMessage = function(text) {
    console.log('sending message:' + text);
    var message = {
        text: text
    }
    this.socket.emit('message', message);
}

$(document).ready(function() {
    var socket = io();
    var chatApp  = new Chat(socket);

    $('#send-form').submit(function() {
        var message = $('#send-message').val();
        chatApp.sendMessage(message);
        return false;
    });
});

