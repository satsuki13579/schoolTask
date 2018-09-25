///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.MeshNormalMaterial;
    private cube: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private line: THREE.LineSegments;
    private line2: THREE.LineSegments;
    private line3: THREE.LineSegments;
    private linegeometry: THREE.Geometry;
    private linematerial: THREE.LineBasicMaterial;
    private linematerial2: THREE.LineBasicMaterial;
    private linegeometry2: THREE.Geometry;
    private linegeometry3: THREE.Geometry;
    private linematerial3: THREE.LineBasicMaterial;
    private idName: string;
    private x: number;
    private y: number;
    private z: number;

    constructor(idName: string, x: number, y: number, z:number) {
        
        this.idName = idName;
        this.x = x;
        this.y = y;
        this.z = z;
        this.createRenderer();
        this.createScene();
    } 

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        
        var viewelement = document.getElementById(this.idName);
        var elmsize = viewelement.getBoundingClientRect();
        this.screenWidth = elmsize.width;
        this.screenHeight = elmsize.height;
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        viewelement.appendChild(this.renderer.domElement);

    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /   
 this.screenHeight, 0.1, 1000);
        this.camera.position.x = this.x;
        this.camera.position.y = this.y;
        this.camera.position.z = this.z;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.linegeometry = new THREE.Geometry();
    this.linegeometry.vertices.push(
            new THREE.Vector3(3, 0, 0),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0xffff00 });
        this.line = new THREE.LineSegments(this.linegeometry, this.linematerial);
        this.scene.add(this.line); 
        this.linegeometry2 = new THREE.Geometry();
        this.linegeometry2.vertices.push(
            new THREE.Vector3(0, 3, 0),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0xffff00 });
        this.line = new THREE.LineSegments(this.linegeometry, this.linematerial);
        this.scene.add(this.line);
        this.linegeometry3 = new THREE.Geometry();
        this.linegeometry3.vertices.push(
            new THREE.Vector3(0, 0, 3),
            new THREE.Vector3(0, 0, 0)
        );
        this.linematerial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.line = new THREE.LineSegments(this.linegeometry, this.linematerial);
        this.scene.add(this.line);
        this.linematerial2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        this.line2 = new THREE.LineSegments(this.linegeometry2, this.linematerial2);
        this.scene.add(this.line2);
        this.linematerial3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.line3 = new THREE.LineSegments(this.linegeometry3, this.linematerial3);
        this.scene.add(this.line3);
    }

    public render() {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}

// document.addEventListener("DOMContentLoaded", function () {
//     var threeJSTest = new ThreeJSTest();
//     threeJSTest.render();
// });
document.addEventListener("DOMContentLoaded", function () {
    var threeJSTestFree = new ThreeJSTest("viewportFree", 3, 3, 3);
    threeJSTestFree.render();
    var threeJSTestX = new ThreeJSTest("viewportX", 3, 0, 0);
    threeJSTestX.render();
    var threeJSTestY = new ThreeJSTest("viewportY", 0, 3, 0);
    threeJSTestY.render();
    var threeJSTestZ = new ThreeJSTest("viewportZ", 0, 0, 3);
    threeJSTestZ.render();
});