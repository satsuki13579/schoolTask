///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/tween.js/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
        this.createParticles();
    }
    createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);
        this.controls = new GuiControl();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    generateSprite() {
        //新しいキャンバスの作成
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        //円形のグラデーションの作成
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0, 0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //テクスチャの生成
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    createParticles() {
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('star.png');
        //ジオメトリの作成
        var geom = new THREE.Geometry();
        var geome = new THREE.Geometry();
        //マテリアルの作成
        var opacity = 1;
        var transparent = true;
        var particleNum = 10;
        this.pointMaterial = new THREE.PointsMaterial({ size: 3, map: texture, vertexColors: THREE.VertexColors, opacity: opacity, transparent: transparent });
        //particleの作成
        var tweeninfo = { x: Math.random() * 51, y: Math.random() * 51, z: Math.random() * 51, item: this, index: this };
        for (var x = 0; x < particleNum; x++) {
            var particle = new THREE.Vector3(Math.random() * 51, Math.random() * 51, Math.random() * 51);
            geom.vertices.push(particle);
            geom.colors.push(new THREE.Color(Math.random() * 0x00ffff)); //色を設定 
        }
        this.cloud = new THREE.Points(geom, this.pointMaterial);
        var tween = new Array();
        var nX;
        var nY;
        var nZ;
        var vertices = [];
        for (var i = 0; i < particleNum; i++) {
            // var particle = new THREE.Vector3(Math.random() * 51, Math.random() * 51, Math.random() * 51);
            // geom.vertices.push(particle);
            // geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));//色を設定
            nX = 1;
            nY = 1;
            nZ = 1;
            tween.push(new TWEEN.Tween(tweeninfo).to({ x: nX, y: nY, z: nZ, item: this, index: i }, 10000).onUpdate(function () {
                // tween[i] =new TWEEN.Tween(tweeninfo).to({ x:nX, y:nY, z:nZ}, 10000).onUpdate(function () {
                geome = this.item.cloud.geometry;
                // for(var n = 0; n < particleNum; n++){
                vertices = geome.vertices;
                vertices[this.index].x = this.x;
                vertices[this.index].y = this.y;
                vertices[this.index].z = this.z;
                geome.verticesNeedUpdate = true;
                // }
                // this.cloud = new THREE.Points(geome, this.pointMaterial);
                // var geom = <THREE.Geometry>this.item.cloud.geometry;
                // var verticess = geom.vertices;
            }));
            tween[i].start();
        }
        // for(var i = 0; i < tween.length;i++){
        //     tween[i].start();
        // }
        this.scene.add(this.cloud);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
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
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        TWEEN.update();
    }
}
class GuiControl {
    constructor() {
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map