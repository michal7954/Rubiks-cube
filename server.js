var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var socketio = require("socket.io");

var server = http.createServer(function (req, res) {

    var files = [
        '/index.html',
        '/css/style.css',
        '/libs/socket.io.js',
        '/libs/jquery.js',
        '/libs/three.js',
        '/libs/OrbitControls.js',
        '/js/Model.js',
        '/js/Game.js',
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
        console.log(req.url)
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

io.sockets.on("connection", function (client) {

    console.log("CLIENT: " + client.id)

    client.emit("onconnect", {
        clientName: client.id
    })

    client.on("disconnect", function () {
        console.log("CLIENT DISCONNECT");
    })

    client.on("bla", function () {
        console.log("MESSAGE FROM CLIENT");
    })

})