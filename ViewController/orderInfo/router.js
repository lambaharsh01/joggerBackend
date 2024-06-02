const express=require('express');
const route=express.Router();

const controller=require('./controller.js');

route.get('/get_user_order_info', controller.get_user_order_info);
    
route.delete('/cancelOrder/:orderId',controller.cancelOrder);

module.exports= route;