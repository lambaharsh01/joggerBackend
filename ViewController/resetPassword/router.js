const express=require('express');
const route=express.Router();

const recordErr=require('../../middleWare/recordErrors');

const { otpMailOptions, mailTransport} =require('../../middleWare/mailer');


function generateRandomValue(){
    let random_source1=new Date().getMilliseconds().toString();
    let random_source2=Math.random().toString();
    let random_source3=new Date().getSeconds().toString();
    let random_source4=Math.floor((Math.random() * 100) + 1).toString();
    let split_random=random_source2.split('.')[1];
    let dig1=split_random[Math.floor(split_random.length/2)];
    let dig2=random_source1[random_source1.length-1];
    let dig3=split_random[split_random.length-1];
    let dig4=random_source4[random_source4.length-1];
    let dig5=random_source3[random_source3.length-1];
    let dig6=split_random[0];

    return `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`

}

route.post('/final_password_reset', async(req,res)=>{
    try{

let {emailId, password, confirmPassword }=req.body;
let strong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])[a-zA-Z0-9!@#$%^&*()-_=+{};:,<.>]+$/;
if(confirmPassword===password){
    if(strong.test(password)){

    bcrypt.hash(password, 10, async(err, hash) => {
        if (err){res.status(401).send('401');
        }else{
        await user_details.updateOne({email:emailId}, {password:hash});
        res.status(200).send('200');
        }
    });

    }else{
    res.status(100).send('100')
    }
}else{
    res.status(100).send('100')
}


    }catch(err){
        recordErr('final_password_reset',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
});

route.post('/send_email_for_pass_reset', async(req,res)=>{
    try{
    let email=req.body.emailId;

    let authenticate=await user_details.findOne({email});
    if(authenticate){


        
let otp=generateRandomValue();


let local_mail_option={...otpMailOptions};
local_mail_option.from.name=`Reset Password`;
local_mail_option.to=email;
local_mail_option.subject='Password Reset OTP';
local_mail_option.text=`${otp} is your Password Reset OTP`;


await new Promise((resolve, reject)=>{
    mailTransport.sendMail(local_mail_option, (error, info)=>{
        if(error) reject(error);
        resolve(info);
    });
});

res.status(200).send('200');

}else{
    res.status(404).send('404');
}

    }catch(err){
        recordErr('send_email_for_pass_reset',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
});

module.exports=route;
//RESET PASSWORD END
//RESET PASSWORD END