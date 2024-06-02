const express=require('express');
const route=express.Router();

const recordErr=require('../../middleWare/recordErrors');


const { otpMailOptions, mailTransport} =require('../../middleWare/mailer.js');

// QUERY START
// QUERY START
route.post('/query_profile', async(req,res)=>{
    try{

        let{name, email, number, query}=req.body;

        let local_mail_option={...otpMailOptions};

        local_mail_option.from.name=`Personal Query`;;
        local_mail_option.subject=`HURRAY QUERY`;
        local_mail_option.to='lambaharsh01@gmail.com';
        local_mail_option.text='',
        local_mail_option.html=`<p><b>Name: </b>${name}</p> 
        <p><b>Email: </b>${email}</p> 
        <p><b>Number: </b>${number}</p> 
        <p><b>Query: </b>${query}</p>`;
        
        
        mailTransport.sendMail(local_mail_option)
        .then(()=>{

            local_mail_option.to='lambaharsh1010@outlook.com';
            mailTransport.sendMail(local_mail_option)
            .then(()=>{
                res.status(200).send('200')
            })
            .catch(err=>{console.log(err)});

        })
        .catch(err=>{console.log(err)});
        


    }catch(err){
        recordErr('query_profile',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
});


module.exports=route;
// QUERY START END
// QUERY START END