/**
 * HttpServer
 * 
 * This is a basic implementation of a HTTP Server, which gets the GEt requests, reads
 * the file content from disk and returns it. It also implements a Cache, so each file
 * is only read once from disk (we don´t care abot memory problems here)
 * 
 * IMPORTANT NOTES:
 * Instances of this class will be used in callback functions, so we have to be careful
 * with the "this" reference. the only way I found to fix it is to send explicity the 
 * reference to the "caller" in the method signature (last parameter "obj" in each
 * method).
 */

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime';

export default class HttpServer {
    constructor() {
        this.cache = {};
        this.send404 = this.send404.bind(this);
        this.sendFile = this.sendFile.bind(this);
    }

    send404(response, obj) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Error 404: resource not found.');
        response.end();
    }

    sendFile(response, filePath, fileContents, obj) {
        response.writeHead(200, {"content-type": mime.getType(path.basename(filePath))});
        response.end(fileContents);
    }

    serveStatic(response, cache, absPath, obj) {
        if (obj == undefined) obj = this;
        if (cache[absPath]) {
            obj.sendFile(response, absPath, cache[absPath]);
        } else {
            fs.exists(absPath, function(exists) {
                if (exists) {
                    fs.readFile(absPath, function(err, data) {
                        if (err) {this.send404(response);}
                        else {
                            cache[absPath] = data;
                            obj.sendFile(response, absPath, data);
                        } 
                    });
                } else {obj.send404(response);}
            })
        }
    }

    start() {
        var that = this;
        var server = http.createServer(function(request, response) {
            var filePath = false;
            var rootFolder = __dirname + '/../../';
            if (request.url == '/') {
                filePath = rootFolder + 'public/index.html';
            } else if (request.url.startsWith('/dist')) {
                filePath = rootFolder + request.url;
            } else {
                filePath = rootFolder + 'public' + request.url;
            }
    
            var absPath = filePath;
            that.serveStatic(response, that.cache, absPath, that);
         });
    
        server.listen(3000, function() {
            console.log("Server listening on port 3000... There we go again!!");
        })
        return server;
    }
}