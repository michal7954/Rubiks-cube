var game;
var net;
var ui;
var preview;

$(document).ready(function () {
    game = new View("body", window.innerWidth, window.innerHeight)
    net = new Net();
    ui = new Ui();

})