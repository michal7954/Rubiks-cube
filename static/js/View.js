function View(target, width, height) {

    var game = this
    var view = this
    var scene = new THREE.Scene();
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

    if (target == 'body') {
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
            if (net.playerNum != -1)
                net.client.emit("cameraChange", camera.position);
        });
    }


    //Tablice dla odpowiednich ścian kostki, aby każda ściana miała identyczny a zarazem różny kolor

    var blocksOfX = []
    for (a = 0; a < 3; a++) {
        blocksOfX[a] = []
    }
    var blocksOfMinusX = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusX[a] = []
    }

    var blocksOfY = []
    for (a = 0; a < 3; a++) {
        blocksOfY[a] = []
    }
    var blocksOfMinusY = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusY[a] = []
    }

    var blocksOfZ = []
    for (a = 0; a < 3; a++) {
        blocksOfZ[a] = []
    }
    var blocksOfMinusZ = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusZ[a] = []
    }

    //

    //DODANIE MESHY

    var geometry = new THREE.BoxGeometry(100, 100, 100);

    var material2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true,
    });

    var materialModel = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        wireframe: false,
        color: 0xff0000
    });


    //
    // Oś X == i
    // Oś Y == j
    // Oś Z == k
    //

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {

                var block = new THREE.Object3D;

                var material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    wireframe: false,
                    color: 0x000
                });


                var cube = new THREE.Mesh(geometry, material);
                block.add(cube);

                var cube2 = new THREE.Mesh(geometry, material2);
                block.add(cube2);

                block.position.set(i * 110, j * 110, k * 110)
                block.userData = { x: i, y: j, z: k }
                scene.add(block);

                if (i == -1) {
                    blocksOfMinusX[j + 1][k + 1] = block
                }
                if (i == 1) {
                    blocksOfX[j + 1][k + 1] = block
                }
                if (j == -1) {
                    blocksOfMinusY[i + 1][k + 1] = block
                }
                if (j == 1) {
                    blocksOfY[i + 1][k + 1] = block
                }
                if (k == -1) {
                    blocksOfMinusZ[i + 1][j + 1] = block
                }
                if (k == 1) {
                    blocksOfZ[i + 1][j + 1] = block
                }
            }
        }
    }

    //

    // Ładowanie 6 różnych modeli, aby miały ten sam kolor ścian. Dodatkowo tutaj dodaje do Bloków z tablicy właśnie te modele

    var modelX = new Model();
    modelX.loadModel("gfx/nalepka.json", function (data) {

        var materialX = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0xff0000
        });

        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialX
                clone.position.set(55, 1, 1)
                clone.rotateY(Math.PI / 2)
                clone.userData = { x: 1, y: j, z: k }
                blocksOfX[j + 1][k + 1].add(clone)
            }
        }
    })

    var modelMinusX = new Model();
    modelMinusX.loadModel("gfx/nalepka1.json", function (data) {
        var materialMinusX = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0x00ff00
        });

        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialMinusX
                clone.position.set(-55, 1, 1)
                clone.rotateY(Math.PI / 2)
                clone.userData = { x: -1, y: j, z: k }
                blocksOfMinusX[j + 1][k + 1].add(clone)
            }
        }
    })

    var modelY = new Model();
    modelY.loadModel("gfx/nalepka2.json", function (data) {
        var materialY = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0x0000ff
        });

        for (i = -1; i < 2; i++) {
            for (k = -1; k < 2; k++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialY
                clone.position.set(1, 55, 1)
                clone.rotateX(Math.PI / 2)
                clone.userData = { x: i, y: 1, z: k }
                blocksOfY[i + 1][k + 1].add(clone)
            }
        }
    })

    var modelMinusY = new Model();
    modelMinusY.loadModel("gfx/nalepka3.json", function (data) {
        var materialMinusY = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0x00ffff
        });

        for (i = -1; i < 2; i++) {
            for (k = -1; k < 2; k++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialMinusY
                clone.position.set(1, -55, 1)
                clone.rotateX(Math.PI / 2)
                clone.userData = { x: i, y: -1, z: k }
                blocksOfMinusY[i + 1][k + 1].add(clone)
            }
        }
    })

    var modelZ = new Model();
    modelZ.loadModel("gfx/nalepka4.json", function (data) {
        var materialZ = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0xffff00
        });

        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialZ
                clone.position.set(1, 1, 55)
                clone.rotateZ(Math.PI / 2)
                clone.userData = { x: i, y: j, z: 1 }
                blocksOfZ[i + 1][j + 1].add(clone)
            }
        }
    })

    var modelMinusZ = new Model();
    modelMinusZ.loadModel("gfx/nalepka5.json", function (data) {
        var materialMinusZ = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            wireframe: false,
            color: 0xff00ff
        });

        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                var clone = data.clone()
                clone.scale.set(40, 40, 1)
                clone.material = materialMinusZ
                clone.position.set(1, 1, -55)
                clone.rotateZ(Math.PI / 2)
                clone.userData = { x: i, y: j, z: -1 }
                blocksOfMinusZ[i + 1][j + 1].add(clone)
            }
        }
    })
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

        if (net.playerNum != -1 && target == 'body')
            net.client.emit("cubeChange", input_data);

        data = input_data;
        frame_num = data.duration
        view.animation = true;

        // WYPRÓŻNIANIE KONTENERA I AKTUALIZOWANIE POZYCJI ORAZ ROTACJI BLOKÓW
        for (i = 0; i < container.children.length; i++) {

            block = container.children[i]
            position = block.getWorldPosition()
            rotation = block.getWorldRotation();

            scene.add(container.children[i]);

            block.position.x = position.x
            block.position.y = position.y
            block.position.z = position.z

            block.rotation.x = rotation._x
            block.rotation.y = rotation._y
            block.rotation.z = rotation._z

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
        scene.add(container);
    }

    this.changeCamera = function (position) {
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;
        camera.lookAt(scene.position)
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
            view.animation = false;
        }
    }

    function render() {
        if (view.animation) frame()
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}
