const mongoose=require('mongoose');

let connection_string=process.env.CONNECTION_STRING;

mongoose.connect(connection_string,
    //this is to make sure about the compatablity of the systems version i.e mondo db and node/express {useNewUrlParser:true,useUnifiedTopology:true}
    )
.then(()=>{console.log('DataBase Connected')})
.catch(err=>{console.log(err)})
