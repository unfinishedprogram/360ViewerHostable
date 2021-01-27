
function FileHandler(){

    this.getFiles = async function(elementID){
        let element = document.getElementById(elementID);
        let files = element.files;
        let loaded_files = [];

        async function getFile(index){
            if (index >= files.length) {return;}
            loaded_files.push(e.target.result);
        }


        function readFile(index){
            var reader = new FileReader();
            if (index >= files.length) {return;}
            reader.onloadend = function(e){
                loaded_files.push(e.target.result);
                readFile(index + 1);
            }
            reader.readAsDataURL(files[index]);
        }

        for (let i = 0; i < files.length; i++){
            var reader = new FileReader();
            reader.readAsDataURL(files[i]).then();
        }

        readFile(0);
        function waitUntilLoaded(){
            setTimeout(() => {
                console.log(loaded_files.length);
                if(loaded_files.length == files.length){
                    console.log("loaded " + loaded_files.length + " files");
                } else{
                    waitUntilLoaded();
                }
            }, 200);
        }

        /////////////////////////////////////////////////////////////

        var inputFiles = document.getElementById(elementID);
        var promise = Promise.resolve();
        inputFiles.files.map( file => promise.then(()=> pFileReader(file)));
        promise.then(() => console.log('all done...'));

        function pFileReader(file){
            return new Promise((resolve, reject) => {
                var fr = new FileReader();
                fr.onload = {
                loaded_files.push(fr.result);
                fr.resolve();};  // CHANGE to whatever function you want which would eventually call resolve
                fr.readAsDataURL(file);
          });
        }



        waitUntilLoaded();
        return loaded_files;
    }
}