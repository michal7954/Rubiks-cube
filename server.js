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

    //console.log("CON: " + client.id)


    client.emit("onconnect", {
        clientName: client.id,
        num: clients.indexOf(client)
    })

    client.on("disconnect", function () {
        if (clients.indexOf(client) != -1) {
            clients[clients.indexOf(client)] = null;
        }
        //console.log("DIS: " + client.id);
    })

    client.on("cubeChange", function (input_data) {
        client.broadcast.emit("cubeChange", input_data);
    })

    client.on("cameraChange", function (position) {
        client.broadcast.emit("cameraChange", position);
    })

})