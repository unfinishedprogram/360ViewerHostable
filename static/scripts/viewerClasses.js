// Instance object to create a panorama viewer element.
class PanoViewerInstance{
    constructor(element){
        this.container_element = element;
        this.panoramas = []
        this.renderer = new THREE.WebGLRenderer();
        this.container_element.appendChild(this.renderer.domElement);
        this.renderer.setSize(this.container_element.clientWidth, this.container_element.clientHeight);

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

    // Used to safely display a loaded panorama from index
    set_view_panorama(index){
        if (index >= 0 && index < this.panoramas.length){
            this.panosphere.material = this.panoramas[index].material;
        } else{
            console.log("error, index out of range");
        }
    }

    go_fullscreen(){
        this.container_element.style.width = '100%';
        this.container_element.style.height ='100%';
    }

    resize_update(){
        console.log(this.renderer);
        this.renderer.setSize(this.container_element.clientWidth, this.container_element.clientHeight);
        this.camera.aspect = this.container_element.clientWidth / this.container_element.clientHeight;
        this.camera.updateProjectionMatrix();
    }
    
    render(){
        this.camera.rotation.y -= 0.002;
        this.renderer.render(this.scene, this.camera);
    }

    setMat(material){
        this.panosphere.material = material;
    }

    setTex(texture){
        this.panosphere.material.map(texture);
        this.panosphere.material.needsUpdate = true;
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

// Takes window object and viewer_instance object and lets the viewer resize;
function add_resize_listner(window, viewer_instance){
    window.onresize = viewer_instance.resize_update;
}



// Has the panorama texture, and material stored to use and apply to the panosphere
class Panorama{
    constructor(imageURL){
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        var loader = new THREE.TextureLoader();
        var texture = new THREE.TextureLoader().load( 'textures/land_ocean_ice_cloud_2048.jpg' );

        var textureloaded = loader.load(
        imageURL,
        function ( texture ) {

            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1; //Mirroring to correct
            return texture;
            this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, side: THREE.DoubleSide });
        },
        undefined,
        function () {
            console.error( 'An error happened while loading the image.' );
        }
        );
        console.log(textureloaded);
    }
}