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
    private gMate: THREE.Material;
    private cube: Physijs.BoxMesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;
    private rrConstraint: Physijs.DOFConstraint;
    private rlConstraint: Physijs.DOFConstraint;
    private fw;

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
        gui.add(this.controls, 'frontWheel', -0.7, 0.7).onChange((e: number) => {
            //ここで値の変更を行う
            this.controls.frontWheel = e;
            this.rrConstraint.setAngularLowerLimit(new THREE.Vector3(0, e, 0.1));//下限値を設定
            this.rrConstraint.setAngularUpperLimit(new THREE.Vector3(0, e, 0));//上限値を設定
            this.rlConstraint.setAngularLowerLimit(new THREE.Vector3(0, e, 0.1));//下限値を設定
            this.rlConstraint.setAngularUpperLimit(new THREE.Vector3(0, e, 0));//上限値を設定

        });

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);




    }

    public createWheel(position: THREE.Vector3) {
        //マテリアルの作成
        var wheelMaterial = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x444444, opacity: 0.9, transparent: true }), 1.0, 0.5);
        //ジオメトリの作成 
        var wheel_geometry = new THREE.CylinderGeometry(4, 4, 2, 10);
        //ホイールの作成
        var wheel = new Physijs.CylinderMesh(wheel_geometry, wheelMaterial, 100);
        //位置の設定
        wheel.rotation.x = Math.PI / 2;
        wheel.castShadow = true;
        wheel.position.copy(position);
        //作成したオブジェクトを返り値として返す 
        return wheel;
    }



    public createCar() {
        //マテリアルの設定
        var car_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true }), 0.5, 0.5);
        //ジオメトリの設定 
        var geom = new THREE.BoxGeometry(15, 4, 4);
        //車のボディを作成
        var body = new Physijs.BoxMesh(geom, car_material, 500);
        //位置を調整して、シーンに追加
        body.position.set(5, 5, 5);
        body.castShadow = true;
        this.scene.add(body);

        //ホイールの作成
        var fr = this.createWheel(new THREE.Vector3(0, 4, 10));
        this.scene.add(fr);
        var fl = this.createWheel(new THREE.Vector3(0, 4, 0));
        this.scene.add(fl);
        var rr = this.createWheel(new THREE.Vector3(10, 4, 10));
        this.scene.add(rr);
        var rl = this.createWheel(new THREE.Vector3(10, 4, 0));
        this.scene.add(rl);
        //ホイールとボディに制約を与える初期設定
        var frConstraint = new Physijs.DOFConstraint(fr, body, new THREE.Vector3(0, 4, 8));
        this.scene.addConstraint(frConstraint);
        var flConstraint = new Physijs.DOFConstraint(fl, body, new THREE.Vector3(0, 4, 2));
        this.scene.addConstraint(flConstraint);
        this.rrConstraint = new Physijs.DOFConstraint(rr, body, new THREE.Vector3(10, 4, 8));
        this.scene.addConstraint(this.rrConstraint);
        this.rlConstraint = new Physijs.DOFConstraint(rl, body, new THREE.Vector3(10, 4, 2));
        this.scene.addConstraint(this.rlConstraint);
        // 制御側のタイヤの動きの制約
        this.fw = this.controls.frontWheel;
        this.rrConstraint.setAngularLowerLimit(new THREE.Vector3(0, this.fw, 0.1));//下限値を設定
        this.rrConstraint.setAngularUpperLimit(new THREE.Vector3(0, this.fw, 0));//上限値を設定
        this.rlConstraint.setAngularLowerLimit(new THREE.Vector3(0, this.fw, 0.1));//下限値を設定
        this.rlConstraint.setAngularUpperLimit(new THREE.Vector3(0, this.fw, 0));//上限値を設定
        // モーターで駆動するタイヤの動きの制約
        frConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
        frConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));
        flConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
        flConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));
        //モーターの設定
        flConstraint.configureAngularMotor(2, 0.1, 0, -2, 1500);//モーター設定
        frConstraint.configureAngularMotor(2, 0.1, 0, -2, 1500);//モーター 設定
        flConstraint.enableAngularMotor(2);//有効化
        frConstraint.enableAngularMotor(2);//有効化

    }

    private createScene() {
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene();
        var frict2 = 0.9; // 摩擦係数
        var rest = 1; // 反発係数
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        //this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube = new Physijs.BoxMesh(this.geometry, this.material);
        // this.scene.add(this.cube);

        var gGeom = new THREE.BoxGeometry(1000, 1000, 0.1);
        this.gMate = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xFFFF00, opacity: 0.5, transparent: true }), frict2, rest);
        var ground = new Physijs.BoxMesh(gGeom, this.gMate, 0);
        ground.rotation.x = -Math.PI / 2;
        // ground.rotation.x = -Math.PI * 85.0/180.0;
        // ground.position.y =  -20.05;
        // ground.position.z = 1.5; 
        this.createCar();
        this.scene.add(ground);


        this.scene.setGravity(new THREE.Vector3(0, -10, 0));

        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 20;
        this.camera.position.y = 20;
        this.camera.position.z = 20;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
    public frontWheel: number;
    constructor() {
        this.frontWheel = 0.8;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};