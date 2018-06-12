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
}