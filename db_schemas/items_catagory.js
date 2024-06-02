let mongoose=require('mongoose');

let item_catagory=new mongoose.Schema({
    main_catagory:String,
    catagory:String,
    sub_catagory:String
});

let item_catagorys=new mongoose.model('item_catagory',item_catagory);

module.exports=item_catagorys;


