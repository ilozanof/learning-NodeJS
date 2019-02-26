import $ from 'jquery';
import './chat.css';

export default class Chat {
    constructor(socket) {
        this.socket = socket;
        socket.on('message', function(message) {
            console.log("message received..........: " + message.text)
;            var newHTMLElement = $('<div></div>').text(message.text);
            $('#messages').append(newHTMLElement);
        });
    }

    sendMessage(text) {
        console.log('sending message:' + text);
        var message = {
            text: text
        }
        this.socket.emit('message', message);
    }

    sayHello() {
        console.log("Hello!!!!!!");
    }
}


