function Game(target, width, height) {

    var game = this
    var scene = new THREE.Scene();
    var loader = new THREE.OBJLoader();
    var camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        10000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x808080);
    renderer.setSize(width, height);
    $(target).append(renderer.domElement);

    var axes = new THREE.AxesHelper(1000);
    axes.position.set(-161, -161, -161)
    scene.add(axes);

    camera.position.set(600, 600, 600);
    camera.lookAt(scene.position);

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
        net.client.emit("cameraChange", camera.position);
    });

    //Ładowanie Modelu

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

    //


    //DODANIE MESHY

    var geometry = new THREE.BoxGeometry(100, 100, 100);

    var material2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        wireframe: true,
    });

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {

                var block = new THREE.Object3D;

                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    wireframe: false,
                });
                material.color.r = Math.random(0, 255)
                material.color.g = Math.random(0, 255)
                material.color.b = Math.random(0, 255)

                var cube = new THREE.Mesh(geometry, material);
                block.add(cube);

                var cube2 = new THREE.Mesh(geometry, material2);
                block.add(cube2);

                block.position.set(i * 110, j * 110, k * 110)
                block.userData = { x: i, y: j, z: k }

                scene.add(block);
            }
        }
    }


    // ZMIENNE DLA ANIMACJI

    var container = new THREE.Object3D;
    var frame_num = 0;
    this.animation = false;

    var data = {
        direction: 1,   // (0/1)
        axis: 'x',      // (x/y/z)
        row: 1,         // (-1/0/1)
        duration: 30,   // (1-60) i więcej - czas trwania animacji w klatkach
    }

    // FUNKCJA PUBLICZNA ROZPOCZYNAJĄCA ODPOWIEDNIĄ ANIMACJĘ
    this.move = function (input_data) {

        data = input_data;
        frame_num = data.duration
        game.animation = true;

        // WYPRÓŻNIANIE KONTENERA I AKTUALIZOWANIE POZYCJI BLOCKÓW
        for (i = 0; i < container.children.length; i++) {

            block = container.children[i]
            poz = block.getWorldPosition()
            direct = block.getWorldDirection();
            //console.log(block)

            scene.add(container.children[i]);

            // JEŚLI JESTEŚ CIEKAWY NAD CZYM SIĘ MĘCZYŁEM PRZEZ OK 2H TO ZAKOMENTUJ TE TRZY LINIJKI...
            block.position.x = poz.x
            block.position.y = poz.y
            block.position.z = poz.z


            /*block.rotation.x = direct.x
            block.rotation.y = direct.y
            block.rotation.z = direct.z*/

            // I ODKOMENTUJ TĘ, MNIEJ WIĘCEJ TO I TYM PODOBNE SPRAWIAŁY MI TRUDNOŚĆ
            //block.position = poz

            i--;
        }
        container = new THREE.Object3D;

        // DYNAMICZNE PUSHOWANIE RZĘDU DO KONTENERA
        for (i = 0; i < scene.children.length; i++) {

            //jeżeli pozycja mesha zgadza się z dokładnością +/- 1
            if (Math.abs(scene.children[i].position[data.axis] - data.row * 110) <= 1) {
                container.add(scene.children[i]);
                i--;
            }
        }
        scene.add(container)
    }

    function frame() {
        if (frame_num > 0) {

            if (data.direction) {
                rotation = Math.PI / data.duration / 2
            }
            else {
                rotation = -Math.PI / data.duration / 2
            }

            switch (data.axis) {
                case 'x':
                    container.rotateX(rotation);
                    break;
                case 'y':
                    container.rotateY(rotation);
                    break;
                case 'z':
                    container.rotateZ(rotation);
                    break;
            }
            frame_num--;

        }
        else {
            game.animation = false;
        }
    }

    function render() {
        if (game.animation) frame()
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}
