
import $ from 'jquery';
import io from 'socket.io-client';
import Chat from './chat';

$(document).ready(function() {
    console.log('trace 1');
    var socket = io();
    console.log('trace 2');
    var chatApp  = new Chat(socket);
    console.log('trace 3');

    $('#send-form').submit(function() {
        var message = $('#send-message').val();
        chatApp.sendMessage(message);
        return false;
    });
});