///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
        this.drawShape();
        // this.createShape();
        this.drawExtrude();
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
        gui.add(this.controls, 'segments', 50, 200).step(1).onChange((e) => {
            this.controls.segments = e;
            this.scene.remove(this.shape1);
            this.drawExtrude();
        });
        gui.add(this.controls, 'radius', 0, 10).step(1).onChange((e) => {
            this.controls.radius = e;
            this.scene.remove(this.shape1);
            this.drawExtrude();
        });
        gui.add(this.controls, 'radiusSegments', 8, 50).step(1).onChange((e) => {
            this.controls.radiusSegments = e;
            this.scene.remove(this.shape1);
            this.drawExtrude();
        });
        gui.add(this.controls, 'closed').onChange((e) => {
            this.controls.closed = e;
            this.scene.remove(this.shape1);
            this.drawExtrude();
        });
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    drawShape() {
        var shape = new THREE.Shape();
        var points = [];
        points.push(new THREE.Vector3(10, 10, 10));
        points.push(new THREE.Vector3(-20, 0, -20));
        points.push(new THREE.Vector3(5, -20, 5));
        points.push(new THREE.Vector3(15, 5, -15));
        points.push(new THREE.Vector3(10, 20, 20));
        // スタート地点へ移動
        shape.moveTo(10, 10);
        // 線を描く
        shape.lineTo(10, 40);
        //2次のカーブを描く
        shape.quadraticCurveTo(20, 50, 30, 40);
        //Spline曲線を描く
        shape.splineThru(points);
        return shape;
    }
    // public createShape(){
    //     var options = {
    //         amount: 10,
    //         bevelThickness: 2,
    //         bevelSize: 1,
    //         bevelSegments: 3,
    //         bevelEnabled: true,
    //         curveSegments: 12,
    //         steps: 1
    //     };
    //     var shapeGeometry = new THREE.ExtrudeGeometry(this.drawShape(), options);
    //     var materials = [new THREE.MeshNormalMaterial({side:THREE.DoubleSide}),new THREE.MeshBasicMaterial({wireframe:true})];
    //     this.shape1  = THREE.SceneUtils.createMultiMaterialObject(shapeGeometry,materials);
    //     this.scene.add(this.shape1); 
    // }
    drawExtrude() {
        //プロパティの設定
        var points = [];
        points.push(new THREE.Vector3(10, 10, 10));
        points.push(new THREE.Vector3(-20, 0, -20));
        points.push(new THREE.Vector3(5, -20, 5));
        points.push(new THREE.Vector3(15, 5, -15));
        points.push(new THREE.Vector3(10, 20, 20));
        var segments = this.controls.segments;
        var radius = this.controls.radius;
        var radiusSegments = this.controls.radiusSegments;
        var closed = this.controls.closed;
        //ジオメトリとマテリアルの生成
        var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed);
        var materials = [new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }), new THREE.MeshBasicMaterial({ wireframe: true })];
        //3DObjectの作成
        this.shape1 = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, materials);
        //シーンへの追加
        this.scene.add(this.shape1);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 50;
        this.camera.position.y = 50;
        this.camera.position.z = 50;
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
        this.shape1.rotation.x += this.controls.rotationSpeed;
        this.shape1.rotation.y += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
        this.segments = 100;
        this.radius = 1.5;
        this.radiusSegments = 20;
        this.closed = false;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map