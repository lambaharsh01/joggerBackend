const mongoose=require('mongoose');

const cartOptions=new mongoose.Schema({
user_id:{type:String, required:true},
product_id:{type:String, required:true},
time:{type:Date, default:Date.now}
});

const cart_info=new mongoose.model('cart_info',cartOptions);;
module.exports=cart_info;
