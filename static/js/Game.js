function Game(placeWhereShow, width, height) {

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
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
    $(placeWhereShow).append(renderer.domElement);

    var axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    camera.position.set(600, 600, 600);
    camera.lookAt(scene.position);

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });


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
                    color: 0xff0,
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

    //WYBRANIE JEDNEGO Z BLOKÓW I POKOLOROWANIE GO NA CZARNO
    var black = scene.children[27]
    black.children[0].material.color = { r: 0, g: 0, b: 0 }


    var container = new THREE.Object3D;
    var frame_num = 0;
    var dir = 1;
    var axis
    var num = 1;
    this.animation = false;

    var game = this

    this.move = function (f_dir, f_axis, f_num) {
        //console.log()
        frame_num = 180
        dir = f_dir
        axis = f_axis
        num = f_num
        game.animation = true;

        /*
        poz = black.getWorldPosition()
        console.log(poz)
        poz = JSON.stringify(poz)
        */
        //console.log(obj.position)
        for (i = 0; i < container.children.length; i++) {
            /*
            poz = {
                x: container.children[i].getWorldPosition().x,
                y: container.children[i].getWorldPosition().y,
                z: container.children[i].getWorldPosition().z,
            }
            */
            obj = container.children[i]
            poz = obj.getWorldPosition()
            poz = JSON.stringify(poz)
            //średnio to działa
            //container.children[i].position.x = container.children[i].getWorldPosition().x;
            //container.children[i].position.y = container.children[i].getWorldPosition().y;
            //container.children[i].position.z = container.children[i].getWorldPosition().z;
            //obj = container.children[i]

            scene.add(container.children[i]);
            //obj.position = poz
            //console.log(poz)

            data = JSON.parse(poz)
            //console.log(data)
            obj.position.x = data.x
            obj.position.y = data.y
            obj.position.z = data.z

            i--;
        }
        /*
        data = JSON.parse(poz)
        console.log(data)
        black.position.x = data.x
        black.position.y = data.y
        black.position.z = data.z
        console.log(black.position)
        */
        //console.log(obj.position)

        container = new THREE.Object3D;

        for (i = 0; i < scene.children.length; i++) {
            //jeżeli pozycja mesha zgadza się z dokładnością +/- 10
            if (Math.abs(scene.children[i].position[axis] - num * 110) <= 10) {
                container.add(scene.children[i]);
                i--;
            }
        }

        scene.add(container)
    }

    function frame() {

        //logowanie pozycji czarnego
        //console.log(obj.getWorldPosition())

        if (frame_num > 0) {

            if (dir) {
                rotation = Math.PI / 360
            }
            else {
                rotation = -Math.PI / 360
            }
            // na razie tylko dla osi X
            //console.log(axis)
            if (axis == 'x')
                container.rotateX(rotation)
            else if (axis == 'y')
                container.rotateY(rotation)
            else if (axis == 'z')
                container.rotateZ(rotation)
        } else {
            game.animation = false;
        }
        frame_num--;
    }


    angle = Math.PI / 4;

    function render() {
        frame()

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();

}

