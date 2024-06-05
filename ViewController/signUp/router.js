const express=require('express');
const route=express.Router();

let user_details=require('../../db_schemas/user_details.js');
let signup_auth=require('../../db_schemas/signup_authentication.js');

const { otpMailOptions, mailTransport} =require('../../middleWare/mailer.js');

const bcrypt=require('bcryptjs');

const recordErr=require('../../middleWare/recordErrors');

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

//mail required

route.post('/send_email_otp', async(req,res)=>{
    try{

let emailId=req.body.emailId;

let user_count=await user_details.findOne({email:emailId});
if(user_count)
   return res.status(409).send('409')


    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if(!emailRegex.test(emailId))
   return res.status(421).send('421');

    const thirtyMinutesAgo = new Date(new Date().getTime() - 30 * 60 * 1000);

    const count = await signup_auth.countDocuments({
    email: emailId,
    otp_sent_time: { $gte: thirtyMinutesAgo }
    });

    if(count>5)
        return res.status(402).send('402');

let otp=generateRandomValue();

let local_mail_option={...otpMailOptions};
local_mail_option.to=emailId.trim();
local_mail_option.text=`${otp} is your SignUp OTP`;



    let authObject={
        email:emailId.trim(),
        otp:otp
    };
    
    await new Promise((resolve, reject)=>{
        mailTransport.sendMail(local_mail_option, (error, info)=>{
            if(error) reject(error);
            resolve(info);
        });
    });

    await signup_auth.create(authObject);

    return res.status(200).send('200');

}catch(err){
    recordErr('send_email_otp',err);
    console.log(err);
    res.status(400).send('something went wrong');
    }
})

route.post('/confirm_otp', async(req,res)=>{
    try{

        let clientEmail=req.body.emailId;
        let clientOtp=req.body.otp;

        let latestDocument = await signup_auth.findOne({ email: clientEmail, otp_sent_time:{$gte: new Date(new Date().getTime() - 20 * 60 * 1000) }}).sort({ timeField: -1 });
        console.log(latestDocument)

if(!latestDocument)
    return res.status(401).send('401');

if(clientOtp===latestDocument.otp){
    return res.status(200).send('200');
}else{
    return res.status(200).send('201');;
}       
    }catch(err){
        recordErr('confirm_otp',err);
        console.log(err)
        res.status(400).send('something went wrong');
    }
})

route.post('/final_user_signup', async(req,res)=>{
    try{

let {firstName, lastName, mobileNum, emailId, password, confirmPassword }=req.body;
let strong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])[a-zA-Z0-9!@#$%^&*()-_=+{};:,<.>]+$/;
if(confirmPassword===password){
    if(strong.test(password)){

    bcrypt.hash(password, 10, async(err, hash) => {
        if (err){res.status(401).send('401');
        }else{

        let user_info={
            first_name:firstName,
            last_name:lastName,
            phone_number:mobileNum,
            email:emailId,
            password:hash
        };
        await user_details.create(user_info);
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
        recordErr('final_user_signup',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
});


module.exports=route;
// SIGNUP SECTION END
// SIGNUP SECTION END