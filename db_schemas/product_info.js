const mongoose=require('mongoose');

let product_details_schema=new mongoose.Schema({
    produt_name:String,
    product_short_discription:String,
    product_picture1:String,
    product_long_discription:String,
    product_price:String,
    product_discount:{type:Boolean, default: false},
    product_discount_price:String,

    size_availablity:String,//to be in arrays
    product_picture2:String,
    product_picture3:String,

    product_main_catagory:String,
    product_catagory:String,
    product_sub_catagory:String,
    
    product_speciality1:String,
    product_speciality1_picture:String,
    product_speciality1_discription:String,

    
    // product_speciality2:String,
    // product_speciality2_picture:String,
    // product_speciality2_discription:String,
    
    insert_time:{type:Date, default:Date.now}
   
});

let product_details=new mongoose.model('product_details',product_details_schema);

module.exports=product_details;