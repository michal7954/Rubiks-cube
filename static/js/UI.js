function Ui() {

    var i = 0

    $(document).keypress(function (e) {
        if (e.key = "Enter") {
            if (i % 2 == 1) {
                c = -1
            }
            else {
                c = 1
            }
            net.client.emit("bla");
            game.move(0, "x", c)
            i++;
        }
    });


}