import ChatServer from './ChatServer';
import HttpServer from './HttpServer';

console.log("Chat Server Ap.");
console.log("Starting Http Server...");

// we start the server...
var myHttpServer = new HttpServer();
var serverRunning = myHttpServer.start();
var myChatServer = new ChatServer(serverRunning);
myChatServer.start();

