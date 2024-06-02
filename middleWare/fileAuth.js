

const fileAuth=function(req, file, cb){

    let auth=false;
    let name_of_file=file.originalname;
    
    if(name_of_file.includes('.')){
        let dots_in_file=name_of_file.split('.');
        if(dots_in_file.length<3){
            if(dots_in_file[1]==='jpg' || dots_in_file[1]==='jpeg' || dots_in_file[1]==='png'){
                auth=true;
            }
        }
    }
    
    if (auth) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }

module.exports=fileAuth;
    