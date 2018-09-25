///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/tween.js/index.d.ts"/>


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
    private cloud: THREE.Points; 
    private tween: TWEEN.Tween[];
    private tweenBack: TWEEN.Tween[];

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
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);




    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        // var tween = new TWEEN.Tween({ scale: 1 }).to({ scale: 3 }, 10000)
        // var tween = new TWEEN.Tween({ scale: 1, item: this }).to({ scale: 3 }, 10000).onUpdate(function () {
            //ここでscaleの値をthis.cubeと関連付ける。
            // this.item.cube.scale.x = this.scale;
        // });
        // tween.start();

        this.tween = [];
        this.tweenBack = []; 
        var radius = 50; 
        var pNum = 5000;
        var geom = new THREE.Geometry();
        var material = new THREE.PointsMaterial({ size: 4, map: this.generateSprite(), blending: THREE.AdditiveBlending, color: 0xffffff, depthWrite: false, transparent: true, opacity: 0.5 });
        for(var pIndex= 0; pIndex< pNum; pIndex++) {var  sqx= radius* (Math.random() -0.5);
            var sqy= radius*(Math.random() -0.5);
            var sqz= radius* (Math.random() -0.5);
            var particle= new THREE.Vector3(sqx, sqy, sqz);
            geom.vertices.push(particle);
        }this.cloud = new THREE.Points(geom, material);
        for(var pIndex= 0; pIndex< pNum; pIndex++) {var geom= <THREE.Geometry>this.cloud.geometry;
            var vertices= geom.vertices; 
            var sqx= vertices[pIndex].x;
            var sqy= vertices[pIndex].y;
            var sqz= vertices[pIndex].z;
            var horang= Math.random() * 2* Math.PI;
            var verang= Math.random() * Math.PI -(Math.PI/2);
            var shx= radius* Math.cos(verang) * Math.sin(horang);
            var shz= radius* Math.cos(verang) * Math.cos(horang);
            var shy= radius* Math.sin(verang);
            var tweeninfo= { x:sqx, y:sqy, z:sqz, index:pIndex, item:this};


        this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
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
        this.cube.rotation.x += this.controls.rotationSpeed;
        this.cube.rotation.y += this.controls.rotationSpeed;
        TWEEN.update();
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