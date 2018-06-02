///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
        this.createCubicBezierCurve();
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
        // gui.add(this.controls, 'rotationSpeed', 0, 5);
        gui.add(this.controls, 'ctrl1x', -100, 100).onChange((e) => {
            this.controls.ctrl1x = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        gui.add(this.controls, 'ctrl1y', -100, 100).onChange((e) => {
            this.controls.ctrl1y = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        gui.add(this.controls, 'ctrl1z', -100, 100).onChange((e) => {
            this.controls.ctrl1z = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        gui.add(this.controls, 'ctrl2x', -100, 100).onChange((e) => {
            this.controls.ctrl2x = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        gui.add(this.controls, 'ctrl2y', -100, 100).onChange((e) => {
            this.controls.ctrl2y = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        gui.add(this.controls, 'ctrl2z', -100, 100).onChange((e) => {
            this.controls.ctrl2z = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo1();
        });
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    renewGeo1() {
        this.curveObject.geometry.dispose(); //現在のGeometryを破棄
        this.ctrl_sph1.geometry.dispose();
        this.ctrl_sph2.geometry.dispose();
        //制御点の座標を準備
        var ctrl_p1 = new THREE.Vector3(this.controls.ctrl1x, this.controls.ctrl1y, this.controls.ctrl1z);
        var ctrl_p2 = new THREE.Vector3(this.controls.ctrl2x, this.controls.ctrl2y, this.controls.ctrl2z);
        var start_p = new THREE.Vector3(-10, 0, 0);
        var end_p = new THREE.Vector3(10, 0, 0);
        //ベジエ曲線を設定
        var curve = new THREE.CubicBezierCurve3(start_p, ctrl_p1, ctrl_p2, end_p);
        //ベジエ曲線上の点を取得
        var points = curve.getPoints(50);
        //点からGeometryを作成
        var ctrl_p1 = new THREE.Vector3(this.controls.ctrl1x, this.controls.ctrl1y, this.controls.ctrl1z);
        var ctrl_p2 = new THREE.Vector3(this.controls.ctrl2x, this.controls.ctrl2y, this.controls.ctrl2z);
        var sph_geo1 = new THREE.SphereGeometry(1, 8, 6);
        var sph_geo2 = new THREE.SphereGeometry(1, 8, 6);
        this.ctrl_sph1.position.x = this.controls.ctrl1x;
        this.ctrl_sph1.position.y = this.controls.ctrl1y;
        this.ctrl_sph1.position.z = this.controls.ctrl1z;
        this.ctrl_sph2.position.x = this.controls.ctrl2x;
        this.ctrl_sph2.position.y = this.controls.ctrl2y;
        this.ctrl_sph2.position.z = this.controls.ctrl2z;
        // this.ctrl_sph1.geometry = new THREE.BufferGeometry().setFromPoints( points );
        // this.ctrl_sph2.geometry = new THREE.BufferGeometry().setFromPoints( points );
        this.curveObject.geometry = new THREE.BufferGeometry().setFromPoints(points);
    }
    createCubicBezierCurve() {
        //制御点の座標を準備
        var start_p = new THREE.Vector3(-10, 0, 0);
        var end_p = new THREE.Vector3(10, 0, 0);
        var seigyo_p1 = new THREE.Vector3(-5, 15, 0);
        var seigyo_p2 = new THREE.Vector3(20, 15, 0);
        //ベジエ曲線を設定
        var curve = new THREE.CubicBezierCurve3(start_p, seigyo_p1, seigyo_p2, end_p);
        //ベジエ曲線上の点を取得
        var points = curve.getPoints(50);
        var sph_geoS = new THREE.SphereGeometry(1, 8, 6);
        var materialS = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.ctrl_sphS = new THREE.Mesh(sph_geoS, materialS);
        this.ctrl_sphS.position.x = -10;
        this.ctrl_sphS.position.y = 0;
        this.ctrl_sphS.position.z = 0;
        var sph_geo1 = new THREE.SphereGeometry(1, 8, 6);
        var material1 = new THREE.MeshLambertMaterial({ color: 0xff0055 });
        this.ctrl_sph1 = new THREE.Mesh(sph_geo1, material1);
        this.ctrl_sph1.position.x = -5;
        this.ctrl_sph1.position.y = 15;
        this.ctrl_sph1.position.z = 0;
        var sph_geo2 = new THREE.SphereGeometry(1, 8, 6);
        var material2 = new THREE.MeshLambertMaterial({ color: 0x0055ff });
        this.ctrl_sph2 = new THREE.Mesh(sph_geo2, material2);
        this.ctrl_sph2.position.x = 20;
        this.ctrl_sph2.position.y = 15;
        this.ctrl_sph2.position.z = 0;
        var sph_geoE = new THREE.SphereGeometry(1, 8, 6);
        var materialE = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.ctrl_sphE = new THREE.Mesh(sph_geoE, materialE);
        this.ctrl_sphE.position.x = 10;
        this.ctrl_sphE.position.y = 0;
        this.ctrl_sphE.position.z = 0;
        //点からGeometryを作成
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        // Materialを作成
        var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        // オブジェクトの生成
        this.curveObject = new THREE.Line(geometry, material);
        // シーンへの追加
        this.scene.add(this.curveObject);
        this.scene.add(this.ctrl_sphS);
        this.scene.add(this.ctrl_sph1);
        this.scene.add(this.ctrl_sph2);
        this.scene.add(this.ctrl_sphE);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 13;
        this.camera.position.y = 13;
        this.camera.position.z = 13;
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
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
        this.ctrl1x = -5;
        this.ctrl1y = 15;
        this.ctrl1z = 0;
        this.ctrl2x = 20;
        this.ctrl2y = 15;
        this.ctrl2z = -5;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map