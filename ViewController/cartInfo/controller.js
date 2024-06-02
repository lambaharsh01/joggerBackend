const cart_info=require('../../db_schemas/cart_info.js');

const recordErr=require('../../middleWare/recordErrors');

exports.isInCart=async(req,res)=>{
    try{

// csrf

let userId=req.session.user_id;
let productId=req.params.productId;

 let existingProduct=await cart_info.findOne({user_id:userId, product_id:productId});
 if(existingProduct){
    res.status(200).json({inCart:true});
 }else{
    res.status(200).json({inCart:false})
 }

    }catch(err){
        recordErr('isInCart',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}


exports.add_to_cart=async(req,res)=>{
    try{
// csrf

let userId=req.session.user_id;
let productId=req.body.productId;

let existingProduct=await cart_info.findOne({user_id:userId, product_id:productId});
if(existingProduct){
    res.status(409).send('409')
}else{
    await cart_info.create({user_id:userId, product_id:productId});
    res.status(200).send('200');
}
    }catch(err){
        recordErr('add_to_cart',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}


exports.remove_from_cart=async(req,res)=>{
    try{
// csrf
let userId=req.session.user_id;
let productId=req.body.productId;


let existingProduct=await cart_info.findOne({user_id:userId, product_id:productId});
if(existingProduct){
    await cart_info.deleteOne({user_id:userId, product_id:productId});
    res.status(200).send('200')
}else{
    res.status(404).send('404');
}
    }catch(err){
        recordErr('remove_from_cart',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

