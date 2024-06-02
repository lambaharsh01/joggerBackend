const express=require('express');
const route=express.Router();

const controller=require('./controller');

route.get('/get_headers', controller.getHeaders );

route.post('/get_per_catagory', controller.getPerCatagory);

route.post('/saveHeaders', controller.saveHeader);

module.exports=route;


