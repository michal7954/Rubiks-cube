var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var socketio = require("socket.io");

var server = http.createServer(function (req, res) {

    if (req.method == "GET") {

        // mów mi "Bóg"
        if (req.url === "/") {
            req.url = "/index.html"
            getFile(req, res, "text/html")
        }
        else if (req.url == "/css/style.css") {
            getFile(req, res, "text/css")
        }
        /*else if (req.url != "/") {
            for (var i = 0; i < filesThatServerRequire.length; i++) {
                getFile(req, res, filesThatServerRequire[i]);
            }
        }*/
    }

    //AJAX somsiedzie
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

function getFile(req, res, type) {
    console.log(req.url)
    fs.readFile("static" + req.url, function (error, data) {
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
        res.end();
    })
}

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});


var io = socketio.listen(server)

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