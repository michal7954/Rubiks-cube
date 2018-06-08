function Ui() {

    var i = 0
    var isTimerTickTock = false;
    $("#timer")[0].innerHTML = "0 : 0 : 00";

    $(document).keypress(function (e) {
        if (e.key = "Enter") {
            if (isTimerTickTock == false) {
                timer();
            }
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

    function timer() {
        var minutesInTimer = 0
        var secondsInTimer = 0
        var milisecondsInTimer = 0
        isTimerTickTock = true;
        setInterval(function () {
            milisecondsInTimer = milisecondsInTimer + 1;
            if (milisecondsInTimer > 999) {
                secondsInTimer = secondsInTimer + 1;
                milisecondsInTimer = 0
            }
            if (secondsInTimer > 59) {
                minutesInTimer = minutesInTimer + 1;
                secondsInTimer = 0
            }
            $("#timer")[0].innerHTML = minutesInTimer + " : " + secondsInTimer + " : " + milisecondsInTimer;
        }, 1)
    }
}