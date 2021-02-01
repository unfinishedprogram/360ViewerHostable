document.getElementById("import_panoramas").onchange = doSubmit;
output_files = [];
viewer_element = document.getElementById('rendererContainer');
viewer_instance = new panoViewerInstance(viewer_element);
//viewer_instance.animate();

function doSubmit() {
    input_element = document.getElementById("import_panoramas");
    files = input_element.files;
    let i = - 1;
    while (i < files.length - 1) {
        i++;
        let reader = new FileReader();
        reader.onload = function (e) {
            dataFile = e.target.result;
            loadCallback(dataFile);
        };
        reader.readAsDataURL(files[i]);
    }
}

function loadCallback(outFile) {
    output_files.push(outFile);
    newmat = new Panorama(outFile);
    viewer_instance.add_panorama(newmat);
    viewer_instance.set_view_panorama(output_files.length - 1);

    animator = new Animator();
    animator.addInstance(viewer_instance);
    
    animate();
}

animate = function(){
    requestAnimationFrame(animate);
    animator.animate();
}