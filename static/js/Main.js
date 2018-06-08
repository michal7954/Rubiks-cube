var game;
var net;
var ui;
var view;

$(document).ready(function () {
    game = new Game("body", window.innerWidth, window.innerHeight)
    net = new Net();
    ui = new Ui();
    view = new Game("#root", $("#root")[0].clientWidth, $("#root")[0].clientHeight);
})