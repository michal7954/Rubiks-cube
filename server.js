﻿var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var socketio = require("socket.io");
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

var server = http.createServer(function (req, res) {

    var files = [
        '/index.html',
        '/css/style.css',
        '/libs/socket.io.js',
        '/libs/jquery.js',
        '/libs/three.js',
        '/libs/OrbitControls.js',
        '/js/SpotLight.js',
        '/js/Model.js',
        '/js/View.js',
        '/js/Net.js',
        '/js/UI.js',
        '/js/Main.js',
        '/gfx/nalepka.json',
        '/gfx/nalepka1.json',
        '/gfx/nalepka2.json',
        '/gfx/nalepka3.json',
        '/gfx/nalepka4.json',
        '/gfx/nalepka5.json',
    ];

    if (req.method == "GET") {
        if (files.includes(req.url)) {
            getFile(req, res);
        }
        else {
            req.url = "/index.html"
            getFile(req, res);
        }
    }
})

function getFile(req, res) {
    fs.readFile("static" + req.url, function (error, data) {
        res.writeHead(200);
        res.write(data);
        res.end();
    })
}

server.listen(3000, function () {
    console.log("PORT: 3000")
});

var io = socketio.listen(server)
var clients = [];

io.sockets.on("connection", function (client) {

    if (clients[0] == null) {
        clients[0] = client;
        if (clients[1]) {
            io.sockets.emit("createPreview");
        }
    }
    else if (clients[1] == null) {
        clients[1] = client;
        io.sockets.emit("createPreview");
    }

    client.emit("onconnect", {
        clientName: client.id,
        num: clients.indexOf(client)
    })

    client.on("disconnect", function () {
        if (clients.indexOf(client) != -1) {
            clients[clients.indexOf(client)] = null;
        }
    })

    client.on("cubeChange", function (input_data) {
        client.broadcast.emit("cubeChange", input_data);
    })

    client.on("cameraChange", function (position) {
        client.broadcast.emit("cameraChange", position);
    })

    client.on('cubeSolved', function (input) {
        mongoClient.connect("mongodb://localhost/RubikCube", function (err, db) {
            if (err) console.log(err)
            else {
                _db = db;
                db.createCollection("Score", function (err, coll) {
                    coll.insert({ "nick": input.nick, "yourScore": input.time }, function (err, result) {
                        getColl(coll, function (data) {
                            output = {
                                coll: data,
                                id: input.id
                            }
                            io.sockets.emit("win", output)
                        })
                    })
                })
            }
        })
    })
})

var getColl = function (coll, callback) {
    coll.find({}).toArray(function (err, items) {
        callback(items)
    })
}