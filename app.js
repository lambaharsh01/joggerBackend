const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser = require('body-parser');
let routes=require('./routes/routes.js');
const cors=require('cors');


const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));


app.use('/', routes)

app.get("/handshake", (req, res) =>
  res.status(200).send("Connection Established")
);

app.listen(port, ()=>{
    console.log('Listening on Port: '+port)
})


