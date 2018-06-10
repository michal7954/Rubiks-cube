function Ui() {

    var i = 0
    var isTimerTickTock = false
    $("#timer")[0].innerHTML = "00:00:00";

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
        var timeAtStartPoint = new Date().getTime()
        isTimerTickTock = true;
        setInterval(function () {
            var timeInTimer = new Date().getTime();
            var timeLeft = timeInTimer - timeAtStartPoint;
            var secs = Math.floor((timeLeft % (60 * 1000)) / 1000)
            var mins = Math.floor((timeLeft / (60 * 1000)))
            var mili = Math.floor((timeLeft % 1000))
            if (secs < 10) {
                secs = "0" + secs;
            }
            if (mins < 10) {
                mins = "0" + mins
            }
            $("#timer")[0].innerHTML = mins + ":" + secs + ":" + mili
        }, 1)
    }
}