///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    private cube: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;

    private torusgroup1: THREE.Group;
    private torusgroup2: THREE.Group;
    private torusgroup3: THREE.Group;
    private torusgroup4: THREE.Group;
    private colorNumber: Number;

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


        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);




    }



    public generateSprite(colorNumber) {
        //新しいキャンバスの作成
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        //円形のグラデーションの作成
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

        switch (colorNumber) {
            case 1:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,0,255,1)');
                gradient.addColorStop(0.4, 'rgba(64, 0,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;
            case 2:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,255,0,1)');
                gradient.addColorStop(0.4, 'rgba(0, 64,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;
            case 3:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
                gradient.addColorStop(0.4, 'rgba(0, 0,64,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;
        }


        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //テクスチャの生成
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;

    }
    public createPoints(geom: THREE.Geometry, colorNumber) {
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: this.generateSprite(colorNumber)
        });
        return new THREE.Points(geom, material);
    }



    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        // this.scene.add(this.cube);

        var tgeom = new THREE.TorusGeometry(30, 5, 12, 12);

        this.torusgroup1 = new THREE.Group();//グループの作成
        var cloudR = this.createPoints(tgeom, 1); //Pointsの作成
        cloudR.name = "R"; //名前をつけます。
        this.torusgroup1.add(cloudR);

        var cloudG = this.createPoints(tgeom, 2); //Pointsの作成
        cloudG.rotation.set(0, 0, Math.PI / 12);
        cloudG.name = "G"; //名前をつけます。
        this.torusgroup1.add(cloudG);

        var cloudB = this.createPoints(tgeom, 3); //Pointsの作成
        cloudB.rotation.set(0, 0, -Math.PI / 12);
        cloudB.name = "B"; //名前をつけます。
        this.torusgroup1.add(cloudB);

        this.torusgroup2 = this.torusgroup1.clone();
        this.torusgroup2.position.x = -120;
        this.torusgroup3 = this.torusgroup1.clone();
        this.torusgroup3.position.x = 120;
        this.torusgroup4 = this.torusgroup1.clone();
        this.torusgroup4.position.y = 120;

        this.scene.add(this.torusgroup1);
        this.scene.add(this.torusgroup2);
        this.scene.add(this.torusgroup3);
        this.scene.add(this.torusgroup4);

        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

    }

    public render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        // this.cube.rotation.x += this.controls.rotationSpeed;
        // this.cube.rotation.y += this.controls.rotationSpeed;

        this.torusgroup1.rotation.z += 0.01;

        this.torusgroup2.rotation.z += 0.04;
        this.torusgroup3.rotation.z += 0.02;
        this.torusgroup4.rotation.z += 0.03;

        var cloudB1 = this.torusgroup1.getObjectByName("R");
        cloudB1.rotation.z += 0.01;
        var cloudR1 = this.torusgroup1.getObjectByName("G");
        cloudR1.rotation.z += 0.04;
        var cloudG1 = this.torusgroup1.getObjectByName("B");
        cloudG1.rotation.z += 0.02;

        var cloudB2 = this.torusgroup2.getObjectByName("R");
        cloudB2.rotation.z += 0.01;
        var cloudR2 = this.torusgroup2.getObjectByName("G");
        cloudR2.rotation.z += 0.02;
        var cloudG2 = this.torusgroup2.getObjectByName("B");
        cloudG2.rotation.z += 0.03;

        var cloudB3 = this.torusgroup3.getObjectByName("R");
        cloudB3.rotation.z += 0.02;
        var cloudR3 = this.torusgroup3.getObjectByName("G");
        cloudR3.rotation.z += 0.01;
        var cloudG3 = this.torusgroup3.getObjectByName("B");
        cloudG3.rotation.z += 0.03;

        var cloudB4 = this.torusgroup4.getObjectByName("R");
        cloudB4.rotation.z += 0.02;
        var cloudR4 = this.torusgroup4.getObjectByName("G");
        cloudR4.rotation.z += 0.03;
        var cloudG4 = this.torusgroup4.getObjectByName("B");
        cloudG4.rotation.z += 0.01;



        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));


    }

}

class GuiControl {
    public rotationSpeed: number;
    public opacity: number;
    public transparent: boolean;
    public particleNum: number;
    constructor() {
        this.rotationSpeed = 0.01;
        this.opacity = 50;
        this.transparent = true;
        this.particleNum = 50;
    }
}




window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};