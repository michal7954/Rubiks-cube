function Model() {

    this.loadModel = function (url, callback) {

        var loader = new THREE.JSONLoader();
        loader.load(url, function (geometry) {

            meshModel = new THREE.Mesh(geometry)
            callback(meshModel);
        });
    }
}
