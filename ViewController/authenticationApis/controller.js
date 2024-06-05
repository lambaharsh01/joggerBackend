
const recordErr=require('../../middleWare/recordErrors');
const jwt=require('jsonwebtoken');

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

    const token = req.header('Authorization')?.split(' ')?.[1] ?? null; 

    if (!token)
        return res.status(200).json({authenticate});

try{
    const verified = jwt.verify(token, process.env.SESS_KEY);

    if(verified.user_id && verified.first_name && verified.user_type){
        authenticate.auth=true;
        authenticate.user_email=verified.user_id;
        authenticate.user_name= verified.first_name+' '+verified.last_name;
        authenticate.user_type= verified.user_type;
        authenticate.loginTime=verified.loginTime;
        authenticate.logOutTime=verified.logOutTime
    }

    res.status(200).json({authenticate})  

}catch(error){
    res.status(200).json({authenticate});
}

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
