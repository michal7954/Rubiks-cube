function Model() {

    // instantiate a loader
   

    // load a resource
    loader.load(
        // resource URL
        'gfx/RubikModel.obj',
        // called when resource is loaded
        function (object) {

            scene.add(object);
            console.log(object)

        },
        // called when loading is in progresses
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}
