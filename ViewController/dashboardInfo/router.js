const express=require('express');
const multer=require('multer')
const route=express.Router();

const controller=require('./controller.js');

const fileAuth=require('../../middleWare/fileAuth.js');


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



let storage2= multer.diskStorage({
    destination: (req, file, cb) => {
        if(file){
            cb(null, './../client/public/dashboard_pictures');
        }},
    filename:(req,file,cb)=>{
if(file){
    cb(null, file.fieldname+Date.now()+generateRandomValue()+file.originalname);
}
    }
});
const upload2 = multer({fileFilter:fileAuth, storage: storage2});

route.get('/get_dashboard_data', controller.get_dashboard_data);

route.post('/add_dashboard_main_banner_details', upload2.single('backgroundImg'), controller.add_dashboard_main_banner_details);

route.post('/setTextBanner',controller.setTextBanner);

module.exports=route;