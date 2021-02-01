function panoViewerInstance(element){
    //Setting up components
    this.container = document.getElementById(element);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    console.log(this.renderer);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);
    this.loadedPanoramas = [];
    this.clock = new THREE.Clock();

    //Creating the panorama sphere object
    this.panosphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 64, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));

    this.scene.add(this.panosphere);

    this.createPanoMat = function(image) { // Takes image data outputs THREE.material
        loader = new THREE.TextureLoader();
        texture = loader.load(image);//Loading the texture
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1; //Mirroring to correct
        material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, side: THREE.DoubleSide });
        material.needsUpdate = true;
        return material;
    }
    this.update = function(){
        this.renderer.render(this.scene, this.camera);
    }
    this.setImage = function(index){
        try{
            this.panosphere.material = this.loadedPanoramas[index];
        }

        catch{
            console.log('Failed to load material at index:' + index);
        }
    }

    this.addPanorama = function (mat){
        this.loadedPanoramas.push(mat);
    }

    this.animate = function () {
        console.log(this);
        requestAnimationFrame(this);
        this.renderer.render(this.scene, this.camera);
    }
    console.log(this);
    requestAnimationFrame(this.animate);
}

