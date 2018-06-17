//isMergeのあたりが作れませんでした　時間が間に合わないのでできたところまでで提出します．


///<reference path="./node_modules/@types/stats.js/index.d.ts"/>
///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    public cloud: THREE.Points;
    private cube: THREE.Mesh;
    private pointMaterial: THREE.PointsMaterial;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;
    private group: THREE.Group;
    private cubes: THREE.Mesh;
    private stats = new Stats();



    constructor() {
        this.createRenderer();
        this.createScene();
        this.createCube();
        // this.createParticles();
    }

    private createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);


        this.controls = new GuiControl();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        gui.add(this.controls, "num", 0, 10000).onChange((e: number) => {
            this.scene.remove(this.group);
            this.scene.remove(this.cubes);
            this.controls.num = e;
            this.createCube();
            // this.createParticles();
        });
        gui.add(this.controls, 'isMerge').onChange((e: boolean) => {
            this.scene.remove(this.group);
            this.scene.remove(this.cubes);
            this.controls.isMerge = e;
            this.createCube();
            // this.createParticles();
        });

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);

    }

    public createCube() {
        var geom = new THREE.Geometry();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        var num = this.controls.num;
        for (var i = 0; i < num; i++) {
            var mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.x = Math.random() * 100;
            mesh.position.y = Math.random() * 100;
            mesh.position.z = Math.random() * 100;
            mesh.updateMatrix();
            //メッシュをgeometryへMerge
            geom.merge(<THREE.Geometry>mesh.geometry, mesh.matrix);
            // this.scene.add(this.cubes);
        }
        this.cubes = new THREE.Mesh(geom, this.material);
        this.scene.add(this.cubes);

    }

    private createScene() {
        this.scene = new THREE.Scene();

        this.stats.showPanel(0); // 0: fps, 1: ms
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.left = '0px';
        this.stats.dom.style.top = '0px';
        //追加
        document.getElementById("viewport").appendChild(this.stats.dom);

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

    public render() {

        this.stats.update();
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

}

class GuiControl {
    public rotationSpeed: number;
    public isMerge: boolean;
    public num: number;
    constructor() {
        this.rotationSpeed = 0.01;
        this.isMerge = true;
        this.num = 10;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};