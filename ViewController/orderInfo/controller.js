const orders_info=require('../../db_schemas/orders_info.js');
const recordErr=require('../../middleWare/recordErrors');
exports.get_user_order_info=async(req,res)=>{
    try{
    let user_id=req.user.user_id;
    
    let orders=await orders_info.find({user_id}).sort({order_time:-1});
    
    res.status(200).json({orders:orders});
    
    }catch(err){
        recordErr('get_user_order_info',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.cancelOrder= async(req,res)=>{
    try{

let _id=req.params.orderId;

await orders_info.deleteOne({_id});

res.status(200).send('200')

    }catch(err){
        recordErr('cancelOrder',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}