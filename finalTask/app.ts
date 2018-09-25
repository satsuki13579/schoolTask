///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>


class ThreeJSTest {
    // private scene: THREE.Scene; //この行をコメントアウト
    private scene: Physijs.Scene;  //この行を追加
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private fGeometry: THREE.Geometry;
    private material: THREE.Material;
    private material2: THREE.Material;
    private fMaterial: THREE.Material;
    private gMate: THREE.Material;
    // private cube: THREE.Mesh;  // コメントアウト
    private cube: Physijs.BoxMesh; // 追加
    private cube2: Physijs.BoxMesh; // 追加

    private fCube: Physijs.BoxMesh; // 追加
    private ball: Physijs.SphereMesh; // 追加
    private ball2: Physijs.SphereMesh; // 追加

    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;
    private syukatsu: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];


    constructor() {
        this.createRenderer();
        this.createScene();
    }

    private createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);

        Physijs.scripts.worker = './physijs/physijs_worker.js';
        Physijs.scripts.ammo = './examples/js/ammo.js';


        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);




    }


    private createScene() {
        //this.scene = new THREE.Scene(); //この行をコメントアウト
        this.scene = new Physijs.Scene(); //この行を追加
        var frict = 0.2; // 摩擦係数
        var frict2 = 0.9; // 摩擦係数
        var rest = 1; // 反発係数
        this.geometry = new THREE.BoxGeometry(1, 2, 0.2);
        this.fGeometry = new THREE.BoxGeometry(30, 2, 0.2);
        this.fMaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xFFFFFF, opacity: 1, transparent: true }), frict, rest);
        this.material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xFFFFFF, opacity: 1, transparent: true }), frict2, rest);
        this.material2 = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0x000000, opacity: 1, transparent: true }), frict2, rest);
        this.fCube = new Physijs.BoxMesh(this.fGeometry, this.fMaterial);
        // this.fCube.rotation.x = Math.PI / 2 * 30.0 / 180.0;
        this.fCube.position.x = -3.5;
        this.fCube.position.z = -3.5;
        this.scene.add(this.fCube);

        for (var i = 0; i < 16; i++) {
            for (var n = 0; n < 64; n++) { //下3行
                if (this.syukatsu[i][n] == 1) {
                    console.log("334");
                    this.cube = new Physijs.BoxMesh(this.geometry, this.material2);
                } else {
                    console.log("72");
                    this.cube = new Physijs.BoxMesh(this.geometry, this.material);
                }
                this.cube.position.z += n * 1.2 - 3;
                this.cube.position.x -= i * 1.2 - 3;
                this.scene.add(this.cube);
            }
        }




        //床1
        var gGeom = new THREE.BoxGeometry(200, 200, 0.3);
        this.gMate = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xFFFF00, opacity: 0.5, transparent: true }), frict2, rest);
        var ground = new Physijs.BoxMesh(gGeom, this.gMate, 0);
        ground.rotation.x = -Math.PI / 2;
        // ground.rotation.x = -Math.PI * 85.0/180.0;
        ground.position.y = -1.05;
        ground.position.z = 1.5;
        this.scene.add(ground);


        //ボール1
        var bFrict = 0; // 摩擦係数
        var bRest = 1; // 反発係数
        var sGeometry = new THREE.SphereGeometry(1, 10, 10);
        var bMaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xFF0000, opacity: 0.5, transparent: true }), bFrict, bRest);
        this.ball = new Physijs.SphereMesh(sGeometry, bMaterial, 1);
        this.ball.rotation.x = Math.PI / 2 * 30.0 / 180.0;
        this.ball.position.x = 0;
        this.ball.position.y = 9;
        this.ball.position.z = -4;
        this.scene.add(this.ball);



        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = -20;
        this.camera.position.y = 40;
        this.camera.position.z = 20;
        this.camera.lookAt(new THREE.Vector3(30, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.setGravity(new THREE.Vector3(0, -10, 0));
        this.scene.add(this.light);

    }

    public render() {
        this.scene.simulate();
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));


    }

}

class GuiControl {
    public rotationSpeed: number;
    constructor() {
        this.rotationSpeed = 0.01;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};