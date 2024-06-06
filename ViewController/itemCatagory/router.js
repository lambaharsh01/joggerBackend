const express=require('express');
const route=express.Router();

const controller=require('./controller');
const jwtAuth=require('../../middleWare/jwtAuth');

route.get('/get_headers', controller.getHeaders );

route.post('/get_per_catagory', controller.getPerCatagory);

route.post('/saveHeaders', jwtAuth, controller.saveHeader);

module.exports=route;


