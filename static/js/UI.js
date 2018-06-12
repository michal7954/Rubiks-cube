function Ui() {

    var i = 0
    var isTimerTickTock = false
    $("#timer")[0].innerHTML = "00:00:00";

    $(document).keypress(function (e) {
        if (e.key == "Enter" && game.animation == false) {

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

        //STRZAŁKI

        if ((e.key == "ArrowLeft" || e.key == "ArrowDown") && game.animation == false) {

            if (isTimerTickTock == false) {
                timer();
            }

            var input_data = {
                direction: 0,
                axis: axis,
                row: row,
                duration: 15,
            }
            if (axis == 'x') {
                input_data.direction = 1;
            }

            game.move(input_data)
            net.client.emit("cubeChange", input_data);

        }

        if ((e.key == "ArrowUp" || e.key == "ArrowRight") && game.animation == false) {

            if (isTimerTickTock == false) {
                timer();
            }

            var input_data = {
                direction: 1,
                axis: axis,
                row: row,
                duration: 15,
            }
            if (axis == 'x') {
                input_data.direction = 0;
            }

            game.move(input_data)
            net.client.emit("cubeChange", input_data);
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


    //BUTTONY
    var axis = 'x'
    $('.axis').on('click', function () {
        $('.axis.picked').removeClass('picked')
        $(this).addClass('picked')
        axis = $(this).val()
        console.log(axis)
    })

    var row = -1
    $('.row').on('click', function () {
        $('.row.picked').removeClass('picked')
        $(this).addClass('picked')
        row = $(this).val()
        console.log(row)
    })









}