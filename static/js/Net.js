function Net() {

    this.client = io();

    this.client.on("onconnect", function (data) {
        console.log(data.clientName)
    })
}