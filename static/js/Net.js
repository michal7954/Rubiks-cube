function Net() {

    this.client = io();
    this.playerNum
    this.playerNick
    var net = this

    this.client.on("onconnect", function (data) {
        if (data.num == -1) {
            console.log("brak miejsc")
        }
        else {
            //console.log(data)
        }
        net.playerNum = data.num
    })

    this.client.on('cubeChange', function (input_data) {
        preview.move(input_data);
    })

    this.client.on('cameraChange', function (position) {
        preview.changeCamera(position);
    })

    this.client.on('createPreview', function () {
        if (!preview) {
            //w tym miejscu opcjonalne wywołanie funkcji mieszającej kostkę
            ui.active = true;
            preview = new View("#root", $("#root")[0].clientWidth, $("#root")[0].clientHeight);
        }
    })

    this.client.on('win', function (input) {
        ui.active = false;
        if (net.client.id == input.id) {
            $("#winOrLose").text("Wygrana")
        }
        else {
            $("#winOrLose").text("Przegrana")
        }

        $("#scoreBoard").empty()
        for (var i = 0; i < input.coll.length; i++) {
            $("#scoreBoard").empty()
            var playerScore = $("<p>")
            playerScore[0].innerHTML = i + ". " + input.coll[i].nick + ": " + input.coll[i].yourScore
            $("#scoreBoard").append(playerScore)
        }
        $("#inputsForSendScore").empty()
    })

}