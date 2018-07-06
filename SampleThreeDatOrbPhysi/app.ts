///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>

class ThreeJSTest {
    //private scene: THREE.Scene;
    private scene: Physijs.Scene;  
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    //private cube: THREE.Mesh;
    private cube: Physijs.BoxMesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;

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
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene(); 
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        //this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube = new Physijs.BoxMesh(this.geometry, this.material);
        this.scene.add(this.cube);

        this.scene.setGravity(new THREE.Vector3(0, -10, 0));

        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /   
 this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
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