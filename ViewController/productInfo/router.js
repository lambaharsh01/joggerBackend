const express=require('express');
const multer=require('multer')
const route=express.Router();

const fileAuth=require('../../middleWare/fileAuth.js');

const controller=require('./controller');


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



let storage1= multer.diskStorage({
    destination: (req, file, cb) => {
        if(file){
            cb(null, '../../../client/public/product_pictures');
        }},
    filename:(req,file,cb)=>{
if(file){
    cb(null, file.fieldname+Date.now()+generateRandomValue()+file.originalname);
}
    }
});

const upload1 = multer({fileFilter:fileAuth, storage: storage1});

route.post('/add_list_data', upload1.fields([
    { name: 'crousalImage1', maxCount: 1 },
    { name: 'crousalImage2', maxCount: 1 },
    { name: 'crousalImage3', maxCount: 1 },
    { name: 'attributeImage', maxCount: 1 },
  ]),
  controller.add_list_data
);

route.post('/update_list_data', upload1.fields([
    { name: 'crousalImage1', maxCount: 1 },
    { name: 'crousalImage2', maxCount: 1 },
    { name: 'crousalImage3', maxCount: 1 },
    { name: 'attributeImage', maxCount: 1 },
  ]), 
  controller.update_list_data 
);

route.get('/get_product_info/:product_id', controller.get_product_info)
route.get('/getRelatedProducts/:main_catagory/:catagory/:product_name', controller.getRelatedProducts );

route.get('/get_all_products', controller.get_all_products);

route.post('/add_dashboard_first_slider_details', controller.add_dashboard_first_slider_details);

route.post('/add_dashboard_second_slider_details', controller.add_dashboard_second_slider_details);

route.post('/setFeaturedProduct2', controller.setFeaturedProduct2);

route.post('/setFeaturedProduct1', controller.setFeaturedProduct1);

route.get('/getProductsLazily/:from/:main_catagory/:catagory/:sub_catagory', controller.getProductsLazily);

route.delete('/deleteThisProduct/:productId', controller.deleteThisProduct);

route.get('/get_cart_details_per_user', controller.get_cart_details_per_user);

route.post('/place_order', controller.place_order);
    
route.post('/buy_whole_cart', controller.buy_whole_cart);

module.exports=route;
