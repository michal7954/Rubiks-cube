function Game() {

    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x808080);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("body").append(renderer.domElement);

    var axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    camera.position.set(600, 600, 600);
    camera.lookAt(scene.position);

    var geometry = new THREE.BoxGeometry(100, 100, 100);

    var material = new THREE.MeshBasicMaterial({
        color: 0x8888ff,
        side: THREE.DoubleSide,
        wireframe: false,
    });

    var material2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        wireframe: true,
    });

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            for (k = -1; k < 2; k++) {

                var cube = new THREE.Mesh(geometry, material);
                var cube2 = new THREE.Mesh(geometry, material2);

                scene.add(cube);
                cube.position.set(i * 110, j * 110, k * 110)

                scene.add(cube2);
                cube2.position.set(i * 110, j * 110, k * 110)
            }
        }
    }

    angle = Math.PI / 4;

    function render() {

        camera.position.x = 600 * Math.cos(angle);
        camera.position.y = 600 * Math.sin(angle);
        camera.position.z = 600 * Math.sin(angle);

        camera.lookAt(scene.position)
        angle = angle + 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();
}