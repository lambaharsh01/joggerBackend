const recordErr=require('../../middleWare/recordErrors');

exports.get_auth=async(req,res)=>{
    try{
    let authenticate={
    auth:null,
    user_email:null,
    user_name:null,
    user_type:null,
    loginTime:null,
    logOutTime:null
    }

    if(req.session.user_id && req.session.first_name && req.session.user_type){
        authenticate.auth=true;
        authenticate.user_email=req.session.user_id;
        authenticate.user_name= req.session.first_name+' '+req.session.last_name;
        authenticate.user_type= req.session.user_type;
        authenticate.loginTime=req.session.loginTime;
        authenticate.logOutTime=req.session.logOutTime
    }

    res.status(200).json({authenticate:authenticate})  

    }catch(err){
        recordErr('get_headers',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.adminAuthentication=async(req,res)=>{
    try{

res.status(200).send('200');

    }catch(err){
        recordErr('adminAuthentication',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}