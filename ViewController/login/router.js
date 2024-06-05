const express=require('express');
const route=express.Router();

const bcrypt=require('bcryptjs');
const moment=require('moment');

const jwt=require('jsonwebtoken');

let user_details=require('../../db_schemas/user_details.js');
const recordErr=require('../../middleWare/recordErrors');


route.post('/auth_user_login', async(req,res)=>{
    try{

        let {email, password}=req.body;

        let user_info=await user_details.findOne({email});
        if(user_info){

        if(await bcrypt.compare(password,user_info.password)){

        let loginTime=moment().format();
        let logoutTime=moment(loginTime).add((1000 * 60 * 60 * 2),'milliseconds').format();


let user={
    user_id: user_info.email,
    first_name: user_info.first_name,
    last_name: user_info.last_name,
    phone_number: user_info.phone_number,
    user_type: user_info.email==='lambaharsh01@gmail.com'? 'admin':'user',
    loginTime: loginTime,
    logOutTime: logoutTime
}

const token = jwt.sign(user, process.env.SESS_KEY, { expiresIn: '1h' });


        res.status(200).json({success: true, token});

        }else{
            res.status(401).send('401')
        }

        }else{
            res.status(404).send('404')
        }

    }catch(err){
        recordErr('auth_user_login',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
})

// LOGIN END
// LOGIN END




// LOGOUT START
route.post('/destroy_session', async(req,res)=>{
    try{
        req.session.destroy((err) => {
            if (err) throw err;
            res.status(200).send('200')
        });
    }catch(err){
        recordErr('destroy_session',err);
        res.status(400).send('something went wrong');
        console.log(err);
    }
});


module.exports=route;
// LOGOUT START END