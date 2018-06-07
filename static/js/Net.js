function Net() {

    var client = io();

    client.on("onconnect", function (data) {
        console.log(data.clientName)
    })
}