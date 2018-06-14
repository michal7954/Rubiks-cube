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
    renderer.setClearColor(0x000);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    $(target).append(renderer.domElement);

    var axes = new THREE.AxesHelper(4000);
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

    //LIGHTS
    for (i = -1; i < 2; i = i + 2) {
        for (j = -1; j < 2; j = j + 2) {
            for (k = -1; k < 2; k = k + 2) {
                var light = new SpotLight();
                light.position.set(i * 600, j * 600, k * 600);
                light.lookAt(scene.position);
                scene.add(light);
            }
        }
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


    //DODANIE MESHY

    var geometry = new THREE.BoxGeometry(100, 100, 100);

    var material = new THREE.MeshPhongMaterial({
        color: 0x000000,
        specular: 0xFFD700,
        shininess: 24,
        side: THREE.DoubleSide,
    })

    //
    // Oś X == i
    // Oś Y == j
    // Oś Z == k
    //

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {

                var block = new THREE.Object3D;

                var cube = new THREE.Mesh(geometry, material);
                cube.castShadow = true
                cube.receiveShadow = true
                block.add(cube);

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

    var positionOfStick = 52;
    var scaleOfStick = 40;

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
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialX
                clone.position.set(positionOfStick, 1, 1)
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
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialMinusX
                clone.position.set(-positionOfStick, 1, 1)
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
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialY
                clone.position.set(1, positionOfStick, 1)
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
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialMinusY
                clone.position.set(1, -positionOfStick, 1)
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
            color: 0xffaa00
        });

        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                var clone = data.clone()
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialZ
                clone.position.set(1, 1, positionOfStick)
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
                clone.scale.set(scaleOfStick, scaleOfStick, 1)
                clone.material = materialMinusZ
                clone.position.set(1, 1, -positionOfStick)
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


        //checkWin(blocksOfMinusX)
        //checkWin(blocksOfMinusY)
        //checkWin(blocksOfMinusZ)
        checkWin(blocksOfX)
        //checkWin(blocksOfY)
        //checkWin(blocksOfZ)

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
        //chwila spoczynku między animacjami
        else if (frame_num <= 0 && frame_num > -6) {
            frame_num--;
        }
        else {

            view.animation = false;

            // CZYSZCZENIE KONTENERA I AKTUALIZOWANIE POZYCJI ORAZ ROTACJI BLOKÓW
            for (i = 0; i < container.children.length; i++) {

                block = container.children[i]
                position = block.getWorldPosition()
                rotation = block.getWorldRotation();

                scene.add(container.children[i]);

                block.position.x = Math.round(position.x)
                block.position.y = Math.round(position.y)
                block.position.z = Math.round(position.z)
                block.userData = {
                    x: Math.round(position.x),
                    y: Math.round(position.y),
                    z: Math.round(position.z)
                }

                block.rotation.x = rotation._x
                block.rotation.y = rotation._y
                block.rotation.z = rotation._z

                i--;

            }
            scene.remove(container);

            /*if (checkWin()) {
              //  $("#nickDiv").css("display", "block")
               // clearInterval(ui.timerInterval)
                $("#nickSubmit").on("click", function () {
                    net.client.emit("zapisDoBazy", { "time": $("#timer").innerHTML, "nick": $("#nickInput").val() })
                })

                net.client.on("getcolls", function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var playerScore = $("<p>")
                        playerScore.innerHTML = i + ". " + data.nick + ": " + data.yourScore
                        $("#scoreBoard").append(playerScore)
                    }
                })
            }*/


            //----------------  !!!  AKTUALIZACJA STANÓW !!!
            //$('#you').text(dobre_z_game / wszystkie ?? 26)
            //$('#opponent').text(dobre_z_gamepreview / wszystkie ?? 26)
        }
    }
    function checkWin() {
        for (var i = 1; i < scene.children.length; i++) {
            console.log(scene.children.length)
            if (scene.children[i].userData.x * 110 == scene.children[i].position.x) {
                if (scene.children[i].userData.y * 110 == scene.children[i].position.y) {
                    if (scene.children[i].userData.z * 110 == scene.children[i].position.z) {
                        return true;
                    }
                }
            } else {
                return false
            }
        }
    }

    function render() {
        if (view.animation) frame()
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}