var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var socketio = require("socket.io");

var server = http.createServer(function (request, response) {
    var req = request;
    var res = response;

    if (request.method == "GET") {

        if (request.url === "/") {
            fs.readFile("static/index.html", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/css/style.css") {
            fs.readFile("static/css/style.css", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'text/css' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/libs/jquery.js") {
            fs.readFile("static/libs/jquery.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/libs/three.js") {
            fs.readFile("static/libs/three.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/libs/OrbitControls.js") {
            fs.readFile("static/libs/OrbitControls.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/Game.js") {
            fs.readFile("static/js/Game.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/Net.js") {
            fs.readFile("static/js/Net.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/UI.js") {
            fs.readFile("static/js/UI.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/Armata.js") {
            fs.readFile("static/js/Armata.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/Kula.js") {
            fs.readFile("static/js/Kula.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
        else if (request.url === "/js/Main.js") {
            fs.readFile("static/js/Main.js", function (error, data) {
                response.writeHead(200, { 'Content-Type': 'application/javascript' });
                response.write(data);
                response.end();
            })
        }
    }
    /*
    if (request.method == "POST") {
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
    // client.id - unikalna nazwa klienta generowana przez socket.io

    client.emit("onconnect", {
        clientName: client.id
    })

    client.on("disconnect", function () {
        console.log("klient się rozłącza");
    })


    client.on("question", function (data) {
        //console.log(data.posX + " - " + data.posY)

        //wysłanie do wszystkich klientów
        //io.sockets.emit("answer", { posX: data.posX, posY: data.posY });

        //wysłanie do wszystkich pozostałych klientów
        //client.broadcast.emit("answer", { posX: data.posX, posY: data.posY });

        //wysłanie do konkretnego klienta (tego samego - client.id)
        io.sockets.to(client.id).emit("answer", { posX: data.posX, posY: data.posY });
    })
})