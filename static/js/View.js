function View(target, width, height) {

    // PODSTAWOWA BUDOWA SCENY
    var view = this
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        10000
    );

    if (target == 'body') {
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000);
    }
    else {
        var renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setClearColor(0x000000, 0);
    }

    renderer.setSize(width, height);
    $(target).append(renderer.domElement);

    camera.position.set(600, 600, 600);
    camera.lookAt(scene.position);

    //ORBIT CONTROLS
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

    //Tablice dla odpowiednich ścian kostki oraz dla odpowiednich kolorów modeli, aby każda ściana miała identyczny a zarazem różny kolor
    var redModels = []
    var blocksOfX = []
    for (a = 0; a < 3; a++) {
        blocksOfX[a] = []
    }
    var greenModels = []
    var blocksOfMinusX = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusX[a] = []
    }

    var blueModels = []
    var blocksOfY = []
    for (a = 0; a < 3; a++) {
        blocksOfY[a] = []
    }

    var lightBlueModels = []
    var blocksOfMinusY = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusY[a] = []
    }

    var orangeModels = []
    var blocksOfZ = []
    for (a = 0; a < 3; a++) {
        blocksOfZ[a] = []
    }

    var purpleModels = []
    var blocksOfMinusZ = []
    for (a = 0; a < 3; a++) {
        blocksOfMinusZ[a] = []
    }

    //
    // Oś X == i
    // Oś Y == j
    // Oś Z == k
    //


    // TWORZENIE SZEŚCIANÓW, Z KTÓRYCH SKŁADA SIĘ KOSTKA ORAZ UMIESZCZENIE ICH W TABLICACH 
    var cubes = [];

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {

                var geometry = new THREE.BoxGeometry(100, 100, 100);
                var material = new THREE.MeshPhongMaterial({
                    color: 0x000000,
                    specular: 0xFFD700,
                    shininess: 18,
                    side: THREE.DoubleSide,
                })

                var block = new THREE.Object3D;

                var cube = new THREE.Mesh(geometry, material);
                block.add(cube);
                cubes.push(cube)

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

    // Ładowanie 6 różnych modeli, aby miały ten sam kolor ścian. Dodatkowo tutaj dodaje do małych sześcianów z tablicy dodane.
    var positionOfStick = 54;
    var positionOfStickY = -40
    var scaleOfStick = 8;

    var modelX = new Model();
    modelX.loadModel("gfx/nalepka.json", function (data) {

        var iter = 0

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
                clone.position.set(positionOfStick - 5, positionOfStickY, 36)
                clone.rotateY(Math.PI / 2)
                clone.userData = { x: 1, y: j, z: k, color: "red" }
                blocksOfX[j + 1][k + 1].add(clone)
                redModels[iter] = clone
                iter++
            }
        }
    })

    var modelMinusX = new Model();
    modelMinusX.loadModel("gfx/nalepka1.json", function (data) {
        var iter = 0
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
                clone.position.set(-positionOfStick, positionOfStickY, 36)
                clone.rotateY(Math.PI / 2)
                clone.userData = { x: -1, y: j, z: k, color: "green" }
                blocksOfMinusX[j + 1][k + 1].add(clone)
                greenModels[iter] = clone
                iter++
            }
        }
    })

    var modelY = new Model();
    modelY.loadModel("gfx/nalepka2.json", function (data) {
        var iter = 0
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
                clone.position.set(positionOfStickY, positionOfStick, positionOfStickY)
                clone.rotateX(Math.PI / 2)
                clone.userData = { x: i, y: 1, z: k, color: "blue" }
                blocksOfY[i + 1][k + 1].add(clone)
                blueModels[iter] = clone
                iter++
            }
        }
    })

    var modelMinusY = new Model();
    modelMinusY.loadModel("gfx/nalepka3.json", function (data) {
        var iter = 0
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
                clone.position.set(positionOfStickY, -positionOfStick + 5, positionOfStickY)
                clone.rotateX(Math.PI / 2)
                clone.userData = { x: i, y: -1, z: k, color: "lightblue" }
                blocksOfMinusY[i + 1][k + 1].add(clone)
                lightBlueModels[iter] = clone
                iter++
            }
        }
    })

    var modelZ = new Model();
    modelZ.loadModel("gfx/nalepka4.json", function (data) {
        var iter = 0
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
                clone.position.set(-positionOfStickY, positionOfStickY, positionOfStick - 5)
                clone.rotateZ(Math.PI / 2)
                clone.userData = { x: i, y: j, z: 1, color: "orange" }
                blocksOfZ[i + 1][j + 1].add(clone)
                orangeModels[iter] = clone
                iter++
            }
        }
    })

    var modelMinusZ = new Model();
    modelMinusZ.loadModel("gfx/nalepka5.json", function (data) {
        var iter = 0
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
                clone.position.set(-positionOfStickY, positionOfStickY, -positionOfStick)
                clone.rotateZ(Math.PI / 2)
                clone.userData = { x: i, y: j, z: -1, color: "purple" }
                blocksOfMinusZ[i + 1][j + 1].add(clone)
                purpleModels[iter] = clone
                iter++
            }
        }
    })


    // ZMIENNE DLA ANIMACJI
    var container = new THREE.Object3D; //GŁÓWNY ROTOWANY KONTENER
    var frame_num = 0; //NR KLATKI W POJEDYNCZEJ ANIMACJI
    this.animation = false; //CZY ANIMACJA NADAL TRWA

    var data = {
        direction: 1,   // (0/1) KIERUNEK OBROTU
        axis: 'x',      // (x/y/z) OŚ OBROTU
        row: 1,         // (-1/0/1) RZĄD
        duration: 30,   // (1-60) i więcej - czas trwania animacji w klatkach
    }


    // FUNKCJA PUBLICZNA ROZPOCZYNAJĄCA ODPOWIEDNIĄ ANIMACJĘ W ZALEŻNOŚCI OD INPUT_DATA
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
    }

    this.changeCamera = function (position) {
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;

        camera.lookAt(scene.position)
    }


    // FUNKCJA ODPOWIADAJĄCA ZA POJEDYNCZĄ KLATKĘ ZWIĄZANĄ Z OBROTEM KONTENERA
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
        else if (frame_num <= 0 && frame_num > -30) {
            frame_num--;
        }

        else {
            // CZYSZCZENIE KONTENERA I AKTUALIZOWANIE POZYCJI ORAZ ROTACJI BLOKÓW
            for (i = 0; i < container.children.length; i++) {

                block = container.children[i]
                position = block.getWorldPosition()
                rotation = block.getWorldRotation();

                scene.add(container.children[i]);

                block.position.x = Math.round(position.x)
                block.position.y = Math.round(position.y)
                block.position.z = Math.round(position.z)

                block.rotation.x = rotation._x
                block.rotation.y = rotation._y
                block.rotation.z = rotation._z

                i--;

            }
            scene.remove(container);

            // WARUNEK WYGRANEJ ROZGRYWKI, KTÓRY UKAZUJE DIVA, KTÓRY POZWALA NA WYSŁANIE TWOJEGO WYNIKU DO BAZY MONGODB.

            if (!data.enter) {
                if (checkWin()[0]) {
                    ui.getTimerInterval()
                    ui.active = false
                    $("#divWhichShowsAfterSolvingCube").css("display", "block")
                    if (target == 'body') {
                        $("#submit")
                            .on("click", function () {
                                input = {
                                    id: net.client.id,
                                    time: $("#timer")[0].innerHTML,
                                    nick: $("#input").val()
                                }
                                net.client.emit("cubeSolved", input)
                            })
                    }
                    else {
                        $("#submit").attr('disabled', 'disabled');
                    }
                }
            }
            view.animation = false; //ZAKOŃCZENIE ANIMACJI
        }
    }

    //  FUNKCJA ODPOWIADAJACE ZA SPRAWDZENIE CZY KOSTKA ZOSTAŁA UŁOŻONA.
    //  DODATKOWO ZWRACA ONA ILOSC POPRAWNIE UŁOŻONYCH ŚCIAN, LECZ TA INFORMACJA NIE JEST PRZEZ WYKORZYSTYWANA

    function checkWin() {
        red = true
        green = true
        blue = true
        lightBlue = true
        orange = true
        purple = true
        good = 0
        wygrana = true

        for (var i = 1; i < redModels.length; i++) {
            if (Math.round(redModels[0].getWorldRotation()._x) == Math.round(redModels[i].getWorldRotation()._x)) {
            } else {
                red = false
                wygrana = false;
            }
        }

        for (var i = 1; i < greenModels.length; i++) {
            if (Math.round(greenModels[0].getWorldRotation()._x) == Math.round(greenModels[i].getWorldRotation()._x)) {
            } else {
                green = false
                wygrana = false;
            }
        }

        for (var i = 1; i < blueModels.length; i++) {
            if (Math.round(blueModels[0].getWorldRotation()._x) == Math.round(blueModels[i].getWorldRotation()._x)) {
            } else {
                blue = false
                wygrana = false;
            }
        }

        for (var i = 1; i < lightBlueModels.length; i++) {
            if (Math.round(lightBlueModels[0].getWorldRotation()._x) == Math.round(lightBlueModels[i].getWorldRotation()._x)) {
            } else {
                lightBlue = false
                wygrana = false;
            }
        }

        for (var i = 1; i < orangeModels.length; i++) {
            if (Math.round(orangeModels[0].getWorldRotation()._x) == Math.round(orangeModels[i].getWorldRotation()._x)) {
            } else {
                orange = false
                wygrana = false;
            }
        }

        for (var i = 1; i < purpleModels.length; i++) {
            if (Math.round(purpleModels[0].getWorldRotation()._x) == Math.round(purpleModels[i].getWorldRotation()._x)) {
            } else {
                purple = false
                wygrana = false;
            }
        }

        if (red) {
            good++
        }
        if (green) {
            good++
        }
        if (blue) {
            good++
        }
        if (lightBlue) {
            good++
        }
        if (purple) {
            good++
        }
        if (orange) {
            good++
        }

        var tab = [wygrana, good];
        return tab;
    }

    //-------------- RUCH KOSTKI NA MYSZCE by MICHAŁ MADEJA
    //--------------  "NIE PYTAJ MNIE, WIEM TYLE CO I TY" --------------------------//

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();
    var over = [];

    this.casting = function (e) {
        mouseVector.x = (e.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(e.clientY / $(window).height()) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(cubes);

        if (intersects.length > 0) {
            if (!over.includes(intersects[0].object.parent)) {
                over.push(intersects[0].object.parent)
            }
        }
    }

    this.calculate = function () {
        if (!view.animation) {

            pos = []
            var obj1 = over[0].position
            if (over[1])
                var obj2 = over[1].position
            obj3 = over[over.length - 1].position
            war = {
                x: true,
                y: true,
                z: true,
            }

            for (i = 0; i < over.length; i++) {
                pos[i] = over[i].position
                if (over[i].position.x != obj1.x) {
                    war.x = false
                }
                if (over[i].position.y != obj1.y) {
                    war.y = false
                }
                if (over[i].position.z != obj1.z) {
                    war.z = false
                }
            }

            if (war.x + war.y + war.z == 1) {

                if (war.x) {
                    var data = {
                        axis: 'x',
                        row: over[0].position.x / 110,
                        duration: 30
                    }
                    var p1 = {
                        x: obj1.z,
                        y: obj1.y
                    }
                    var p2 = {
                        x: obj2.z,
                        y: obj2.y
                    }
                    var alfa = Math.atan2(p1.y, p1.x)
                    var beta = Math.atan2(p2.y, p2.x)
                    var gamma = beta - alfa;
                    angle = gamma * 180 / Math.PI

                    if (angle == 45 || angle == -315)
                        data.direction = 0
                    else if (angle == -45 || angle == 315)
                        data.direction = 1

                    view.move(data)
                }

                else if (war.y) {
                    var data = {
                        axis: 'y',
                        row: over[0].position.y / 110,
                        duration: 30
                    }
                    var p1 = {
                        x: obj1.x,
                        y: obj1.z
                    }
                    var p2 = {
                        x: obj2.x,
                        y: obj2.z
                    }
                    var alfa = Math.atan2(p1.y, p1.x)
                    var beta = Math.atan2(p2.y, p2.x)
                    var gamma = beta - alfa;
                    angle = gamma * 180 / Math.PI

                    if (angle == 45 || angle == -315)
                        data.direction = 0
                    else if (angle == -45 || angle == 315)
                        data.direction = 1

                    view.move(data)
                }

                else if (war.z) {

                    var data = {
                        axis: 'z',
                        row: over[0].position.z / 110,
                        duration: 30
                    }
                    var p1 = {
                        x: obj1.x,
                        y: obj1.y
                    }
                    var p2 = {
                        x: obj2.x,
                        y: obj2.y
                    }
                    var alfa = Math.atan2(p1.y, p1.x)
                    var beta = Math.atan2(p2.y, p2.x)
                    var gamma = beta - alfa;
                    angle = gamma * 180 / Math.PI

                    if (angle == 45 || angle == -315)
                        data.direction = 1
                    else if (angle == -45 || angle == 315)
                        data.direction = 0

                    view.move(data)
                }
            }
        }
        over = []
    }

    //RENDERER
    function render() {
        if (view.animation) frame()
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}