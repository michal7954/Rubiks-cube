function Net() {

    this.client = io();
    this.playerNum

    this.client.on("onconnect", function (data) {
        if (data.num == -1) {
            console.log("brak miejsc")

        }
        else {
            console.log(data)
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
            preview = new View("#root", $("#root")[0].clientWidth, $("#root")[0].clientHeight);
        }
    })
}