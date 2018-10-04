///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.MeshNormalMaterial;
    private materialN: THREE.MeshNormalMaterial;
    private materialL: THREE.MeshLambertMaterial;
    private materialMD: THREE.MeshPhongMaterial;
    private materialMF: THREE.MeshPhongMaterial;
    private materialW: THREE.MeshPhongMaterial;
    private torus: THREE.Mesh;
    private toruses: { [key: string]: THREE.Mesh } = {};
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;

    constructor() {
        this.createRenderer();
        this.createScene();
    } 

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
        
        
        
    }  

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        this.material = new THREE.MeshNormalMaterial();
        this.materialN = new THREE.MeshNormalMaterial();
        this.materialL = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.materialMD = new THREE.MeshPhongMaterial({ color: 0x55ff00 });
        this.materialMF = new THREE.MeshPhongMaterial({ color: 0x55ff00, flatShading: true });
        this.materialW = new THREE.MeshPhongMaterial({ color: 0x55ff00, wireframe: true });
        this.torus = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.torus);
        this.toruses["z"] = new THREE.Mesh(this.geometry, this.materialN);
        this.toruses["x"] = new THREE.Mesh(this.geometry, this.materialL);
        this.toruses["c"] = new THREE.Mesh(this.geometry, this.materialMD);
        this.toruses["v"] = new THREE.Mesh(this.geometry, this.materialMF);
        this.toruses["b"] = new THREE.Mesh(this.geometry, this.materialW);
        this.scene.add(this.toruses["z"]);
        this.scene.add(this.toruses["x"]);
        this.scene.add(this.toruses["c"]);
        this.scene.add(this.toruses["v"]);
        this.scene.add(this.toruses["b"]);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /   
 this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    } 

    public render() {
        this.torus.rotation.x += 0.01;
        this.toruses["z"].rotation.x += 0.01;
        this.toruses["x"].rotation.x += 0.01;
        this.toruses["c"].rotation.x += 0.01;
        this.toruses["v"].rotation.x += 0.01;
        this.toruses["b"].rotation.x += 0.01;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

    public onKeyPress(e:KeyboardEvent){
        this.torus.visible = false;
        this.toruses["z"].visible = false;
        this.toruses["x"].visible = false;
        this.toruses["c"].visible = false;
        this.toruses["v"].visible = false;
        this.toruses["b"].visible = false;

        this.toruses[e.key].visible = true;
    }

    

}

// window.onload = () => {
//     var threeJSTest = new ThreeJSTest();
//     threeJSTest.render(); 
// };

var threeJSTest: ThreeJSTest;

document.addEventListener("DOMContentLoaded", function () {
    threeJSTest = new ThreeJSTest();
    threeJSTest.render();
});
document.addEventListener("keypress", (e: KeyboardEvent) => {
    
    threeJSTest.onKeyPress(e);
 });
