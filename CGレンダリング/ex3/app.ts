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
    

    constructor() {
        this.createRenderer();
        this.createScene();
    } 

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
        document.addEventListener("DOMContentLoaded", function () {
            var threeJSTest = new ThreeJSTest();
            threeJSTest.render();
        });
        document.addEventListener('keydown', function (event: KeyboardEvent) {
            if (event.key == 'z')
                window["isZDown"] = true;
        
            if (event.key == 'x')
                window["isXDown"] = true;
        });
        
        document.addEventListener('keyup', function (event: KeyboardEvent) {
            if (event.key == 'z')
                window["isZDown"] = false;
        
            if (event.key == 'x')
                window["isXDown"] = false;
        });
    }  

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        
        

    var ar = this.screenWidth / this.screenHeight;
    this.camera = new THREE.OrthographicCamera(-5 * ar, 5 * ar, 5, -5, 0.1, 1000);
    this.camera.position.x = 3;
    this.camera.position.y = 3;
    this.camera.position.z = 3;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.linegeometry = new THREE.Geometry();
    this.linegeometry.vertices.push(
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(0, 0, 0)
    );

    var num=0;
    for(var i = 0; i < 21; i++){
        for(var j = 0; j < 21; j++ ){
            num++;
            if(num % 2 == 0 ){
                var mat = new THREE.MeshLambertMaterial({ color: 0x0055bb });

            } else if(num % 2 == 1){
                var mat = new THREE.MeshLambertMaterial({ color: 0x0015bb });
            }
            var mesh = new THREE.Mesh(this.geometry, mat);
            mesh.position.set(i-21, -10, j-21);
            this.scene.add(mesh);  
        }
    }
    
    var mat1 = new THREE.MeshLambertMaterial({ color: 0x0055bb });
    var mat2 = new THREE.MeshLambertMaterial({ color: 0x0055bb });
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    var mesh = new THREE.Mesh(this.geometry, mat1);
    var mesh = new THREE.Mesh(this.geometry, mat2);
    //正方形のジオメトリはthis.geometryを使いまわす
    mesh.position.set(-10, -10, -10);
    this.scene.add(mesh);
    //ローカル変数でもaddメソッドでシーンに追加すればシーンが
    //インスタンスを保持するので消えることはない

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
        var ar = this.screenWidth / this.screenHeight;
        var orthocam = <THREE.OrthographicCamera>this.camera;
        if(window["isZDown"]){
            orthocam.left += 0.5*ar;
            orthocam.right -= 0.5*ar;
            orthocam.top -= 0.5;
            orthocam.bottom += 0.5;
            orthocam.updateProjectionMatrix();    
        }
        else if(window["isXDown"]){
            orthocam.left -= 0.5*ar;
            orthocam.right += 0.5*ar;
            orthocam.top += 0.5;
            orthocam.bottom -= 0.5;
            orthocam.updateProjectionMatrix();    
        }

        // orthocam.left = 新しい値;
        // orthocam.right = 新しい値;
        // orthocam.top = 新しい値;
        // orthocam.bottom = 新しい値;
        orthocam.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}

window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render(); 
};