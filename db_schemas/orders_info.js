const mongoose=require('mongoose');

const orders=new mongoose.Schema({

user_id:{type:String, required:true},
product_id:{type:String, required:true},
product_name:String,
product_img:String,

order_time:{type:Date, default:Date.now},

quantity:{type:Number, required:true},
product_size:{type:String, required:true},

currency:{type:String, required:true},
product_price:{type:Number, required:true},
totalBill:{type:Number, required:true},

address:{type:String, required:true},

delivery_status:{type:String, default:'Undelivered'}

});

const orders_info=new mongoose.model('orders_info',orders);;
module.exports=orders_info;