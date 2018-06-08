function Ui() {

    var i = 0

    $(document).keypress(function (e) {
        if (e.key = "Enter" && game.animation == false) {
            if (i % 3 == 0) {
                //c = -1
                a = 'x'
            }
            else if (i % 3 == 1) {
                //c = 1
                a = 'y'
            }
            else if (i % 3 == 2) {
                //c = 1
                a = 'z'
            }
            net.client.emit("bla");
            game.move(0, a, 1)
            i++;
        }
    });


}