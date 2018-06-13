function SpotLight() {
    var light = new THREE.SpotLight(0xffffff, 11, 1000, 2.5);
    light.castShadow = true
    return light
}
