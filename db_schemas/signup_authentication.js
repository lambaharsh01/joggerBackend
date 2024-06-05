let mongoose=require('mongoose');

let signup_auth=new mongoose.Schema({
    email:{type:String, required:true},
    otp:String,
    otp_sent_time:{type:Date, default:Date.now},
});

let signup_auth_collection=new mongoose.model('signup_auth',signup_auth);

module.exports= signup_auth_collection;