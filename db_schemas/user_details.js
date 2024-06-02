let mongoose=require('mongoose');

let user_info=new mongoose.Schema({
    first_name:String,
    last_name:String,
    phone_number:String,
    email:{type:String, required:true},
    password:String,
    registration_date:{type:Date, default:Date.now},
});

let user_collection=new mongoose.model('user_info',user_info);

module.exports=user_collection;