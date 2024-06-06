const express=require('express');
const route=express.Router();
let connection=require('../dbconnection/config.js');

const nodemailer=require('nodemailer');
    

function getCurrentDate(){
    let date = new Date();
    let dateOptions = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
    let date1 = date.toLocaleString('en-US', dateOptions).split('/');
    return date1[2] + '-' + date1[0] + '-' + date1[1]; // yyyy-mm-dd
}








// nodemailer transport
// nodemailer transport
// let mailTransport=nodemailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     secure:true,
//     auth:{
//         user:process.env.GMAIL_USER,
//         pass:process.env.GMAIL_PASS
//     }
// });
// let otpMailOptions={
//     from:{
//         name:'Sign Up OTP',
//         address:process.env.GMAIL_USER
//     },
//     to:'',
//     subject:'OTP For SignUp',
//     text:''
// }
// nodemailer transport end
// nodemailer transport end


const authenticationApis= require('../ViewController/authenticationApis/router');
const callander= require('../ViewController/callander/router');
const cartInfo= require('../ViewController/cartInfo/router');
const dashboardInfo= require('../ViewController/dashboardInfo/router');
const itemCatagory= require('../ViewController/itemCatagory/router');
const login= require('../ViewController/login/router');
const orderInfo= require('../ViewController/orderInfo/router');
const portfolio= require('../ViewController/portfolio/router');
const productInfo= require('../ViewController/productInfo/router');
const resetPassword= require('../ViewController/resetPassword/router');
const signUp= require('../ViewController/signUp/router');

route.use('/', authenticationApis);
route.use('/', callander);
route.use('/', cartInfo);
route.use('/', dashboardInfo);
route.use('/', itemCatagory);
route.use('/', login);
route.use('/', orderInfo);
route.use('/', portfolio);
route.use('/', productInfo);
route.use('/', resetPassword);
route.use('/', signUp);

module.exports=route;