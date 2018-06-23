///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/tween.js/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
    }
    createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);
        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        var tween = new TWEEN.Tween({ scale: 1 }).to({ scale: 3 }, 10000);
        var tween = new TWEEN.Tween({ scale: 1, item: this }).to({ scale: 3 }, 10000).onUpdate(function () {
            //ここでscaleの値をthis.cubeと関連付ける。
            this.item.cube.scale.x = this.scale;
        });
        tween.start();
        this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        this.cube.rotation.x += this.controls.rotationSpeed;
        this.cube.rotation.y += this.controls.rotationSpeed;
        TWEEN.update();
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map