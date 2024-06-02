const list_collection=require('../../db_schemas/list_collection.js');

const recordErr=require('../../middleWare/recordErrors');


exports.api_get_all_tasks=async(req,res)=>{
    try{
        let list_data=await list_collection.find({});
        res.json({list_data:list_data});
    }catch(err){
        recordErr('api_get_all_tasks',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.update_task_complision=async(req,res)=>{
    try{
    
    let task_id=req.body.task_id;
    // console.log(task_id)
    
    await list_collection.updateMany({_id:task_id}, {completion_date:new Date(), completion_status:true});
    res.status(200).send('200')
        }catch(err){
            recordErr('update_task_complision',err);
            console.log(err);
            res.status(400).send('something went wrong');
        }
    }


    exports.delete_task=async(req,res)=>{
        try{
            let _id=req.body.task_id;
    
            await list_collection.deleteOne({_id});
    
            res.status(200).send('200');
    
        }catch(err){
            recordErr('delete_task',err);
            console.log(err);
            res.status(400).send('something went wrong');
        }
    }

    exports.insert_new_task=async(req,res)=>{
        try{
    
            let {task_name,target_date,task_discription}=req.body;
            
            await list_collection.create({task_name,task_discription,target_date});
    
        res.status(200).send('200');
        
    }catch(err){
        recordErr('insert_new_task',err);
        console.log(err)
        res.status(400).send('something went wrong');
        }
    }

    exports.get_month_events=async(req,res)=>{
        try{
    
    let month_date=req.body.date;
    
    let request_date=new Date(month_date);
    
    let year=request_date.getFullYear();
    let month=request_date.getMonth()+1;
    
    let last_month_end=new Date(year, month-1, 0);
    let this_month_end=new Date(year, month, 1);
    
    let month_data=await list_collection.find({
        target_date:{
            $gt:last_month_end,
            $lte:this_month_end
        }
    });
    
    
    res.status(200).json({month_data:month_data})
    
        }catch(err){
            recordErr('get_month_events',err);
            console.log(err);
            res.status(400).send('something went wrong');
        }
    }