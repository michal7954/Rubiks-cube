function Net() {

    this.client = io();

    this.client.on("onconnect", function (data) {
        if (data.num == -1) {
            console.log("brak miejsc")
        }
        else {
            console.log(data)
        }

    })

    this.client.on('createPreview', function () {
        if (!preview) {
            preview = new Preview("#root", $("#root")[0].clientWidth, $("#root")[0].clientHeight);
        }
    })
}