const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser = require('body-parser');
let routes=require('./routes/routes.js');
const session=require('express-session');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const sess_time = 1000 * 60 * 60 * 2;

app.use(session({
    secret: process.env.SESS_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: sess_time,
        sameSite: 'strict',
    }
}));


app.use('/', routes)

app.listen(8080,()=>{
    console.log('Port 8080')
})


