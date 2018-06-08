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
    //scene.add(axes);

    camera.position.set(600, 600, 600);
    camera.lookAt(scene.position);

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });

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

    //console.log(scene.children[0].uuid)

    var container = new THREE.Object3D;
    var frame_num = 0;
    var dir = 1;
    var axis = "x"
    var num = 1;

    var game = this

    this.move = function (f_dir, f_axis, f_num) {

        frame_num = 180
        dir = f_dir
        axis = f_axis
        num = f_num


        for (i = 0; i < container.children.length; i++) {
            scene.add(container.children[i]);
            i--;
        }
        container = new THREE.Object3D;

        for (i = 0; i < scene.children.length; i++) {
            if (scene.children[i].userData[axis] == num) {
                container.add(scene.children[i]);
                i--;
            }
        }

        scene.add(container)
    }

    function frame() {
        if (frame_num > 0) {

            if (dir) {
                rotation = Math.PI / 360
            }
            else {
                rotation = -Math.PI / 360
            }

            container.rotateX(rotation)
        }
        else {
            //game.move(0, "x", 1)
        }
        frame_num--
    }



    angle = Math.PI / 4;

    function render() {

        frame()

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

