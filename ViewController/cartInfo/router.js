const express=require('express');
const route=express.Router();
const jwtAuth=require('../../middleWare/jwtAuth.js')

const controller=require('./controller.js');

route.get('/isInCart/:productId',jwtAuth ,controller.isInCart);

route.post('/add_to_cart', jwtAuth, controller.add_to_cart);

route.post('/remove_from_cart',jwtAuth , controller.remove_from_cart);

module.exports=route;
