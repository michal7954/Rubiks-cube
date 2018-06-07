var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var socketio = require("socket.io");

var req
var res

var server = http.createServer(function (req, res) {


    if (req.method == "GET") {

        if (req.url === "/") {
            fs.readFile("static/index.html", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/css/style.css") {
            fs.readFile("static/css/style.css", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/libs/jquery.js") {
            fs.readFile("static/libs/jquery.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/libs/three.js") {
            fs.readFile("static/libs/three.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/libs/OrbitControls.js") {
            fs.readFile("static/libs/OrbitControls.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/libs/socket.io.js") {
            fs.readFile("static/libs/socket.io.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/Game.js") {
            fs.readFile("static/js/Game.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/Net.js") {
            fs.readFile("static/js/Net.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/UI.js") {
            fs.readFile("static/js/UI.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/Armata.js") {
            fs.readFile("static/js/Armata.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/Kula.js") {
            fs.readFile("static/js/Kula.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
        else if (req.url === "/js/Main.js") {
            fs.readFile("static/js/Main.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }
    }
    /*
    if (req.method == "POST") {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            var finishObj = qs.parse(allData);
        })
    }
    */
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});


var io = socketio.listen(server) // server -> server nodejs

io.sockets.on("connection", function (client) {

    console.log("klient się podłączył, ID: " + client.id)

    client.emit("onconnect", {
        clientName: client.id
    })

    client.on("disconnect", function () {
        console.log("klient się rozłącza");
    })

    client.on("bla", function () {
        console.log("bla");
    })

})

