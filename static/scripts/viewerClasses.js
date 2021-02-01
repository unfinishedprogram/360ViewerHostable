class panoViewerInstance{
    constructor(element){
        this.renderer_container = element;
        this.panoramas = []
        this.renderer = new THREE.WebGLRenderer();
        this.renderer_container.appendChild(this.renderer.domElement);
        this.renderer.setSize(this.renderer_container.clientWidth, this.renderer_container.clientHeight);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, rendererContainer.clientWidth / rendererContainer.clientHeight, 0.1, 1000);
        let sphere_geo = new THREE.SphereBufferGeometry(1, 64, 32);
        let temp_mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.panosphere = new THREE.Mesh(sphere_geo, temp_mat);
        this.scene.add(this.panosphere);

        window.onresize = this.resize_update;
    }

    add_panorama(panorama){
        this.panoramas.push(panorama);
    }

    set_view_panorama(index){
        if (index >= 0 && index < this.panoramas.length){
            this.panosphere.material = this.panoramas[index].material;
        } else{
            console.log("error, index out of range");
        }
    }

    resize_update(){
        console.log('resize');
        console.log(this);
        this.renderer.setSize(this.rendererContainer.clientWidth, this.rendererContainer.clientHeight);
        this.camera.aspect = this.rendererContainer.clientWidth / this.rendererContainer.clientHeight;
        this.camera.updateProjectionMatrix();
    }
    
    render(){
        this.camera.rotation.y -= 0.001;
        this.renderer.render(this.scene, this.camera);
    }
}

class Animator{
    constructor(){
        this.instances = [];
    }

    addInstance(viewer_instance){
        this.instances.push(viewer_instance);
    }
    
    animate(){
        for(let i = 0; i < this.instances.length; i++){
            this.instances[i].render();
        }
    }
}


// Has the panorama texture, and material stored to use and apply to the panosphere
class Panorama{
    constructor(image){
         this.set_image(image);
    }

    set_image(image){
        this.texture = THREE.ImageUtils.loadTexture(image); //Loading the texture
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.repeat.x = -1; //Mirroring to correct
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.texture, side: THREE.DoubleSide });
    }
}