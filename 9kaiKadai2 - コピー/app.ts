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
    private pvelocity: THREE.Vector3[];

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
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        gui.add(this.controls, "opacity",0,1 ).onChange((e: number) => {
            this.pointMaterial.opacity = e;
        });
        gui.add(this.controls, 'transparent' ).onChange((e: boolean) => {
            this.pointMaterial.transparent = e;
        });
        gui.add(this.controls, 'particleNum',0,10000 ).onChange((e: number) => {
            this.scene.remove(this.cloud);
            this.controls.particleNum = e;
            this.createParticles();
        });

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);

    }  

    public createParticles() {
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('star.png'); 
        //ジオメトリの作成
        var geom = new THREE.Geometry();
        //マテリアルの作成
        this.pointMaterial = new THREE.PointsMaterial({ size: 4, map: texture, blending: THREE.AdditiveBlending, color: 0xffffff, depthWrite: false, transparent: true, opacity: 0.5 })
        this.pvelocity = [];
        //particleの作成
        for (var x = 0; x < 10000;  x++) {
                var particle = new THREE.Vector3(Math.random()*1000, Math.random() * 1000, Math.random() * 1000);
                geom.vertices.push(particle);
                geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));//色を設定
                this.pvelocity.push(new THREE.Vector3( 0,1,0));
        }
        //THREE.Pointsの作成
        this.cloud = new THREE.Points(geom, this.pointMaterial);
        //シーンへの追加
        this.scene.add(this.cloud);
   }

    private createScene() {
        this.renderer.setClearColor(new THREE.Color(0x000000)); 
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /   
 this.screenHeight, 0.1, 1000);
        this.camera.position.x = 300;
        this.camera.position.y = 300;
        this.camera.position.z = 300;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        this.createParticles();
    } 

    public render() {
        var geom = <THREE.Geometry>this.cloud.geometry;
        var vertices = geom.vertices;
        for(var i=0;i<vertices.length;i++){
            if(vertices[i].y < -100){
                vertices[i].y = 200;
            }
            vertices[i].x = vertices[i].x - this.pvelocity[i].x;
            vertices[i].y = vertices[i].y - this.pvelocity[i].y;
            vertices[i].z = vertices[i].z - this.pvelocity[i].z;
        }
        geom.verticesNeedUpdate = true;
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