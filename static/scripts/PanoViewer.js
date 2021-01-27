// Requires three.js to work

function PanoViewerInstance(element){
    //Setting up components
    this.container = document.getElementById(element);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    this.loadedPanoramas = [];
    this.clock = new THREE.Clock()

    //Creating the panorama sphere object
    this.sphereMesh =
    this.panosphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 64, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));

    this.scene.add(this.panosphere);

    this.createPanoMat = function(image) { // Takes image data outputs THREE.material
        loader = new THREE.TextureLoader();
        texture = loader.load(image);//Loading the texture
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1; //Mirroring to correct
        return new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, side: THREE.DoubleSide });
    }

    this.setImage = function(index){
        try{
            this.panosphere.material = this.loadedPanoramas[index];
        }

        catch{
            console.log('Failed to load material at index:' + index);
        }
    }

    this.addPanoramas = function (panoramas){
        for (pano in panoramas) {
            console.log(typeof pano);
            this.loadedPanoramas.push(this.createPanoMat(pano));
        }

    }

    this.update = function(delta){
        console.log(delta);
    }

    this.animate = function() {
        delta = this.clock.getDelta();
        this.update(delta);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

}

