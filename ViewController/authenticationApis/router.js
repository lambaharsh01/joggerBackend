const express=require('express');
const route=express.Router();

const controller=require('./controller');

route.get('/get_auth', controller.get_auth);

route.get('/adminAuthentication', controller.adminAuthentication);

module.exports=route;


