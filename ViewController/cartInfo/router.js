const express=require('express');
const route=express.Router();

const controller=require('./controller.js');

route.get('/isInCart/:productId', controller.isInCart);

route.post('/add_to_cart', controller.add_to_cart);

route.post('/remove_from_cart', controller.remove_from_cart);

module.exports=route;
