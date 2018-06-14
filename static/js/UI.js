function Ui() {

    var i = 0
    var ui = this
    this.timerInterval;
    this.active = false
    var O = ['x', 'y', 'z']
    var isTimerTickTock = false

    $(document).keydown(function (e) {
        if (ui.active) {
            if (e.key == "Enter" && game.animation == false) {

                var input_data = {
                    direction: Math.floor(Math.random() * 2),
                    axis: O[Math.floor(Math.random() * 3)],
                    row: Math.floor(Math.random() * 3) - 1,
                    duration: 15,
                }

                game.move(input_data)

                i++;
            }

            //STRZAŁKI

            else if ((e.key == "ArrowLeft" || e.key == "ArrowDown") && game.animation == false) {

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

            }

            else if ((e.key == "ArrowUp" || e.key == "ArrowRight") && game.animation == false) {

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

            }

            // KLAWISZE FUNKCYJNE DLA STEROWANIA

            else if (e.key == 'x' || e.key == 'y' || e.key == 'z' || e.key == 'q' || e.key == 'w' || e.key == 'e') {

                switch (e.key) {
                    case 'q':
                        e.key = 'x';
                        break;
                    case 'w':
                        e.key = 'y';
                        break;
                    case 'e':
                        e.key = 'z';
                        break;
                }

                $('.axis.picked').removeClass('picked')
                $('[value=' + e.key + ']').addClass('picked')
                axis = e.key
            }

            else if (e.key == '1' || e.key == '2' || e.key == '3') {
                $('.row.picked').removeClass('picked')
                $('[value=' + parseInt(e.key - 2) + ']').addClass('picked')
                row = e.key - 2
            }
        }


    });

    //BUTTONY
    var axis = 'x'
    $('.axis').on('click', function () {
        if (ui.active) {
            $('.axis.picked').removeClass('picked')
            $(this).addClass('picked')
            axis = $(this).val()
        }

    })

    var row = -1
    $('.row').on('click', function () {
        if (ui.active) {
            $('.row.picked').removeClass('picked')
            $(this).addClass('picked')
            row = $(this).val()
        }
    })

    function timer() {
        var timeAtStartPoint = new Date().getTime()
        isTimerTickTock = true;
        timerInterval = setInterval(function () {
            var timeInTimer = new Date().getTime();
            var timeLeft = timeInTimer - timeAtStartPoint;
            var secs = Math.floor((timeLeft % (60 * 1000)) / 1000)
            var mins = Math.floor((timeLeft / (60 * 1000)))
            var mili = Math.floor((timeLeft % 1000))

            if (mili == 0) {
                mili = '000';
            }
            else if (mili < 10) {
                mili = '00' + mili;
            }
            else if (mili < 100) {
                mili = '0' + mili;
            }

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