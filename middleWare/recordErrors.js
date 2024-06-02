const fs=require('fs');

const { otpMailOptions, mailTransport} =require('./mailer.js');

module.exports=async function recordErr(api, err){

    let currentTime = new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata',  year: 'numeric',  month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit' }).replace(/\//g, '-').replace(',', '');
    
    let errorString=`Error Time ${currentTime} at ${api} \n`;
        
    if(err.stack){
        let satringedArray=[];
        if(err.stack.includes('\n')){
            satringedArray=err.stack.split('\n');
        };
        errorString+=satringedArray.join('\n');
    }
    errorString+='\n\n'
        
        fs.appendFileSync('./routes/error_logs.txt', errorString);
                
        let local_mail_option={...otpMailOptions};
        local_mail_option.from.name='CheckOut Render';
        local_mail_option.subject='Some Error Occured',
        local_mail_option.to='lambaharsh01@gmail.com';
        local_mail_option.text=errorString;


        await new Promise((resolve, reject)=>{
        mailTransport.sendMail(local_mail_option, (error, info)=>{
            if(error) reject(error);
            resolve(info);
        });
        });
    }
    