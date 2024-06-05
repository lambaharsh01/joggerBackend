const express=require('express');
const route=express.Router();

const jwtAuth=require('../../middleWare/jwtAuth.js');

const controller=require('./controller.js');

route.get('/get_user_order_info', jwtAuth, controller.get_user_order_info);
    
route.delete('/cancelOrder/:orderId',controller.cancelOrder);

module.exports= route;