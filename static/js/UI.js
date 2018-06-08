function Ui() {

    var i = 0
    var isTimerTickTock = false;
    $("#timer")[0].innerHTML = "0 : 0 : 00";

    $(document).keypress(function (e) {
        if (e.key = "Enter" && game.animation == false) {

            if (isTimerTickTock == false) {
                timer();
            }

            var input_data = {
                direction: 1,
                axis: 'x',
                row: 1,
                duration: 15,
            }

            switch (i % 3) {
                case 0:
                    input_data.axis = 'x'
                    break;
                case 1:
                    input_data.axis = 'y'
                    break;
                case 2:
                    input_data.axis = 'z'
                    break;
            }

            net.client.emit("bla");
            game.move(input_data)

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