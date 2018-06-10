function Ui() {

    var i = 0
    var isTimerTickTock = false;
    $("#timer")[0].innerHTML = "0 : 0 : 00";

    $(document).keypress(function (e) {
        if (e.key = "Enter" && game.animation == false) {


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
}