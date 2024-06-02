let mongoose=require('mongoose');

let list_collection_schema=new mongoose.Schema({
    task_name:String,
    task_discription:String,
    inserted_time:{type:Date, default:Date.now},
    target_date:Date,
    completion_status:{type:Boolean, default: false},
    completion_date:Date,
});

let list_collection=new mongoose.model('list_collection',list_collection_schema);

module.exports=list_collection;