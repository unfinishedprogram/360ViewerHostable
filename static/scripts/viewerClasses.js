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
        this.renderer.setSize(this.rendererContainer.clientWidth, this.rendererContainer.clientHeight);
        this.camera.aspect = this.rendererContainer.clientWidth / this.rendererContainer.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    animate(){
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
    
}

class Animator{
    constructor(){
        this.instances = [];
    }

    addInstance(viewer_instance){
        this.instances.push(viewer_instance);
        console.log(this.instances.length);
    }
    
    animate(){
        for (viewer in this.instances){
            console.log(viewer);
            viewer.renderer.render(viewer.scene, viewer.camera);
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