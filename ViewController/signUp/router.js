const express=require('express');
const route=express.Router();

let user_details=require('../../db_schemas/user_details.js');

const { otpMailOptions, mailTransport} =require('../../middleWare/mailer.js');
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

if(req.session.signUpTries){
    delete req.session.signUpOtp;
    delete req.session.signUpEmail;
    delete req.session.signUpTries;
}

let emailId=req.body.emailId;

let user_count=await user_details.findOne({email:emailId});
if(user_count){
    res.status(409).send('409')

}else{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailRegex.test(emailId)){

        let otp=generateRandomValue();

let local_mail_option={...otpMailOptions};
local_mail_option.to=emailId.trim();
local_mail_option.text=`${otp} is your SignUp OTP`;


await new Promise((resolve, reject)=>{
mailTransport.sendMail(local_mail_option, (error, info)=>{
    if(error) reject(error);
    resolve(info);
});
});

req.session.signUpOtp=otp;
req.session.signUpEmail=emailId;
res.status(200).send('200');

// mailTransport.sendMail(local_mail_option)
// .then(()=>{
// req.session.signUpOtp=otp;
// req.session.signUpEmail=emailId;
// res.status(200).send('200');
// })
// .catch(err=>{
//     console.log(err)
//     recordErr('While sending email',err);
// });


    }else{
        res.status(421)
    }
}

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

if(req.session.signUpOtp==clientOtp && req.session.signUpEmail==clientEmail){
res.status(200).send('200');

}else{
    if(req.session.signUpTries==undefined){
        req.session.signUpTries='true';
        res.status(200).send('201');
    }else{
        res.status(401).send('401');
    }
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