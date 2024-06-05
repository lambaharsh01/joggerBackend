const product_info=require('../../db_schemas/product_info.js');//major use
const dashboard_info=require('../../db_schemas/dashboard_info.js');//minor use
const cart_info=require('../../db_schemas/cart_info.js');//minor use
const orders_info=require('../../db_schemas/orders_info.js');//minor use

const recordErr=require('../../middleWare/recordErrors.js');


exports.add_list_data=async(req,res)=>{
    try{
        // admin task
        // CSRF
        const crousalImage1File = req.files['crousalImage1'] ? req.files['crousalImage1'][0].filename : null;
        const crousalImage2File = req.files['crousalImage2'] ? req.files['crousalImage2'][0].filename : null;
        const crousalImage3File = req.files['crousalImage3'] ? req.files['crousalImage3'][0].filename : null;
        const attributeImageFile = req.files['attributeImage'] ? req.files['attributeImage'][0].filename : null;

        let {productName,productShortDiscription,selectedMainCatagory,selectedCatagory,selectedSubCatagory,productPrice,discount,productDiscountedPrice,sizes,productBriefDiscription,extraAttriuteHeading, extraAttriuteDetails}=req.body;
        
        sizes=JSON.parse(sizes);

if(validateAddition(productName,productShortDiscription,selectedMainCatagory,selectedCatagory,selectedSubCatagory,productPrice,JSON.parse(discount),productDiscountedPrice,sizes,productBriefDiscription,crousalImage1File,crousalImage2File)){

    await product_info.create({produt_name:productName, product_short_discription:productShortDiscription, product_picture1:crousalImage1File, product_long_discription:productBriefDiscription, product_price:productPrice, product_discount:JSON.parse(discount), product_discount_price:productDiscountedPrice, size_availablity:JSON.stringify(sizes), product_picture2:crousalImage2File, product_picture3: crousalImage3File, product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory, product_sub_catagory:selectedSubCatagory, product_speciality1:extraAttriuteHeading, product_speciality1_picture:attributeImageFile, product_speciality1_discription:extraAttriuteDetails});

    res.status(200).send('data saved')

}else{
    res.status(409);
}

    }catch(err){
        recordErr('add_list_data',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.update_list_data=async(req,res)=>{
    try{

        // admin task
        // CSRF
const crousalImage1File = req.files['crousalImage1'] ? {product_picture1:req.files['crousalImage1'][0].filename} : {};
const crousalImage2File = req.files['crousalImage2'] ? {product_picture2:req.files['crousalImage2'][0].filename} : {};
const crousalImage3File = req.files['crousalImage3'] ? {product_picture3:req.files['crousalImage3'][0].filename} : {};
const attributeImageFile = req.files['attributeImage'] ? {product_speciality1_picture:req.files['attributeImage'][0].filename} : {};

        let {productId, productName,productShortDiscription,selectedMainCatagory,selectedCatagory,selectedSubCatagory,productPrice,discount,productDiscountedPrice,sizes,productBriefDiscription,extraAttriuteHeading, extraAttriuteDetails}=req.body;
        
        sizes=JSON.parse(sizes);

const pictures={...crousalImage1File, ...crousalImage2File, ...crousalImage3File, ...attributeImageFile}
        

    await product_info.updateOne({_id:productId},{produt_name:productName, product_short_discription:productShortDiscription, product_long_discription:productBriefDiscription, product_price:productPrice, product_discount:JSON.parse(discount), product_discount_price:productDiscountedPrice, size_availablity:JSON.stringify(sizes), product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory, product_sub_catagory:selectedSubCatagory, product_speciality1:extraAttriuteHeading, product_speciality1_discription:extraAttriuteDetails, ...pictures});

    res.status(200).send('data saved')



    }catch(err){
        recordErr('update_list_data',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};

function validateAddition(productName,productShortDiscription,selectedMainCatagory,selectedCatagory,selectedSubCatagory,productPrice,discount,productDiscountedPrice,sizes,productBriefDiscription,crousalImage1File,crousalImage2File){
    let unauthenticat=0;
    
        productName===''? unauthenticat++: null;
        productShortDiscription===''? unauthenticat++: null;
        selectedMainCatagory===''? unauthenticat++: null;
        selectedCatagory===''? unauthenticat++: null;
        selectedSubCatagory===''? unauthenticat++: null;
        productPrice===''? unauthenticat++: null;
        discount? productDiscountedPrice===''?unauthenticat++:null : null;
        sizes.length<1? unauthenticat++:null;
        sizes.forEach(element => {
            if(element===''){unauthenticat++}
        });
        productBriefDiscription===''? unauthenticat++:null;
        crousalImage1File? null:unauthenticat++;
        crousalImage2File? null:unauthenticat++;
    
        if(unauthenticat<1){
            return true;
        }else{
            return false;
        }
    
}

exports.get_product_info=async(req,res)=>{
    try{
        let product_id=req.params.product_id;
        let product=await product_info.findById(product_id);
        res.status(200).json({product:product});

    }catch(err){
        recordErr('get_product_info/:product_id',err);
        res.status(200).json({product:null});
        console.log(err);
}};

exports.getRelatedProducts=async(req,res)=>{
    try{
    let main_catagory=req.params.main_catagory;
    let catagory=req.params.catagory;
    let product_name=req.params.product_name;

// aggrigate method used in mongo db to select out the random product belonging to the catagory and sub catagpry
        let products=await product_info.aggregate([
            { $match: { product_main_catagory: main_catagory, product_catagory: catagory, produt_name:{$ne:product_name}}},
            { $sample: { size: 10 } },
            { $project: { _id: 1, produt_name: 1, product_short_discription: 1, product_picture1: 1, product_price:1, product_discount:1, product_discount_price:1} }
          ]);

        res.status(200).json({products:products});

    }catch(err){
        recordErr('getRelatedProducts/',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};

exports.get_all_products=async(req,res)=>{
    try{
    
        let products=await product_info.find({},{_id: 1, produt_name: 1, product_short_discription: 1, product_picture1: 1});
    
        res.json({products:products});
    
    }catch(err){
        recordErr('get_all_products',err);
        console.log(err);
        res.status(400).send('something went wrong');
}};
    

exports.add_dashboard_first_slider_details=async(req, res)=>{
try{  
    // admin task  
//CSRF
let {firstSliderSource, selectedMainCatagory, selectedCatagory, selectedSubCatagory}=req.body;

let productList=JSON.stringify([]); 

if(selectedSubCatagory.includes('Select Sub Catagory')){

let data=await product_info.find({product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory}, {_id:1, produt_name:1, product_short_discription:1, product_picture1:1, product_price:1, product_discount:1, product_discount_price:1 }).limit(10);

productList=JSON.stringify(data);

}else{

    let data=await product_info.find({product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory, product_sub_catagory:selectedSubCatagory}, {_id:1, produt_name:1, product_short_discription:1, product_picture1:1, product_price:1, product_discount:1, product_discount_price:1, product_sub_catagory:1 }).limit(10);

    productList=JSON.stringify(data);
}


await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {first_slider_heading:firstSliderSource, first_slider:productList})


res.status(200).send('200');

}catch(err){
    recordErr('add_dashboard_first_slider_details',err);
    console.log(err);
    res.status(400).send('something went wrong');
}};

        
        


exports.add_dashboard_second_slider_details=async(req, res)=>{
    try{

        // admin task
    //CSRF
let {secondSliderSource, selectedMainCatagory, selectedCatagory, selectedSubCatagory}=req.body
    
let productList=JSON.stringify([]); 

if(selectedSubCatagory.includes('Select Sub Catagory')){

let data=await product_info.find({product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory}, {_id:1, produt_name:1, product_short_discription:1, product_picture1:1, product_price:1, product_discount:1, product_discount_price:1 }).limit(10);

productList=JSON.stringify(data);

}else{

    let data=await product_info.find({product_main_catagory:selectedMainCatagory, product_catagory:selectedCatagory, product_sub_catagory:selectedSubCatagory}, {_id:1, produt_name:1, product_short_discription:1, product_picture1:1, product_price:1, product_discount:1, product_discount_price:1, product_sub_catagory:1 }).limit(10);

    productList=JSON.stringify(data);
}


await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {second_slider_heading:secondSliderSource, second_slider:productList})


    res.status(200).send('200');

}catch(err){
    recordErr('add_dashboard_second_slider_details',err);
    console.log(err);
    res.status(400).send('something went wrong');
}};




exports.setFeaturedProduct2=async(req, res)=>{
    try{
    
        // admin task
        //CSRF
        let {featuredProduct2Id, featuredTwo, featuredProduct2Heading, featuredProduct2FontColor, featuredProduct2ButtonColor, featuredProduct2ButtonFontColor}=req.body
    
        let baseObject={};
        
        let productInfo=await product_info.findById(featuredProduct2Id);
        if(productInfo){
            baseObject.fetured_product_2_img=productInfo.product_picture1;
        }
        
        if(featuredProduct2Id && featuredProduct2Id!==''){
            baseObject.fetured_product_2_id=featuredProduct2Id;
        }
    
        if(featuredTwo && featuredTwo!==''){
            baseObject.fetured_product_2_name=featuredTwo;
        }
    
        if(featuredProduct2Heading && featuredProduct2Heading!==''){
            baseObject.fetured_product_2_heading=featuredProduct2Heading
        }
        if(featuredProduct2FontColor && featuredProduct2FontColor!==''){
            baseObject.fetured_product_2_font_color=featuredProduct2FontColor
        }
        if(featuredProduct2ButtonColor && featuredProduct2ButtonColor!==''){
            baseObject.fetured_product_2_button_color=featuredProduct2ButtonColor
        }
        if(featuredProduct2ButtonFontColor && featuredProduct2ButtonFontColor!==''){
            baseObject.fetured_product_2_button_font_color=featuredProduct2ButtonFontColor
        }
    
        await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {...baseObject});
     
        res.status(200).send('200');
    
    }catch(err){
        recordErr('setFeaturedProduct2',err);
        console.log(err);
        res.status(400).send('something went wrong');
}};
    
    
exports.setFeaturedProduct1=async(req, res)=>{
try{
    // admin task
    //CSRF
    let {featuredProduct1Id, featuredOne, featuredProduct1Heading, featuredProduct1FontColor, featuredProduct1ButtonColor, featuredProduct1ButtonFontColor}=req.body

    
    let baseObject={};
    
    let productInfo=await product_info.findById(featuredProduct1Id);
    if(productInfo){
        baseObject.fetured_product_1_img=productInfo.product_picture1;
    }
    if(featuredProduct1Id && featuredProduct1Id!==''){
        baseObject.fetured_product_1_id=featuredProduct1Id
    }
    if(featuredOne && featuredOne!==''){
        baseObject.fetured_product_1_name=featuredOne
    }

    if(featuredProduct1Heading && featuredProduct1Heading!==''){
        baseObject.fetured_product_1_heading=featuredProduct1Heading
    }
    if(featuredProduct1FontColor && featuredProduct1FontColor!==''){
        baseObject.fetured_product_1_font_color=featuredProduct1FontColor
    }
    if(featuredProduct1ButtonColor && featuredProduct1ButtonColor!==''){
        baseObject.fetured_product_1_button_color=featuredProduct1ButtonColor
    }
    if(featuredProduct1ButtonFontColor && featuredProduct1ButtonFontColor!==''){
        baseObject.fetured_product_1_button_font_color=featuredProduct1ButtonFontColor
    }


    await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {...baseObject});

    res.status(200).send('200');

}catch(err){
    recordErr('setFeaturedProduct1',err);
    console.log(err);
    res.status(400).send('something went wrong');
}};


    

exports.getProductsLazily=async(req,res)=>{
    try{
    
        let from=req.params.from;
        let main_catagory=req.params.main_catagory;
        let catagory=req.params.catagory;
        let sub_catagory=req.params.sub_catagory;
    
    
        let searchObject={};
        
        if(main_catagory && main_catagory!=='null'){
            searchObject.product_main_catagory=main_catagory;
        }
        if(catagory && catagory!=='null'){
            searchObject.product_catagory=catagory;
        }
        if(sub_catagory && sub_catagory!=='null'){
            searchObject.product_sub_catagory=sub_catagory;
        }
    
        let reqiredFileds={_id: 1, produt_name: 1, product_short_discription: 1, product_picture1: 1, product_price:1, product_discount:1, product_discount_price:1, product_main_catagory:1, product_catagory:1, product_sub_catagory:1};
        
        if(!isNaN(from)){
            let products=await product_info.find(searchObject, reqiredFileds).sort({insert_time:-1}).skip(from).limit(5);
    
            res.status(200).json({
                products:products
            })
        }else{
            res.status(404);
        }
            
    }catch(err){
        recordErr('getProductsLazily',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};
    


exports.deleteThisProduct=async(req,res)=>{
    try{

let productId=req.params.productId;
let productInfo=await product_info.findById(productId);

await product_info.deleteOne({ _id:productId});
await cart_info.deleteMany({product_id:productId});

let mainCatagory=productInfo.product_main_catagory;
let catagory=productInfo.product_catagory;

res.status(200).json({mainCatagory:mainCatagory, catagory:catagory})


    }catch(err){
        recordErr('deleteThisProduct',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};
    

exports.get_cart_details_per_user=async(req,res)=>{
    try{
    // CSRF USER AUTH

    let userId=req.user.user_id;

    let cartItems=await cart_info.find({user_id:userId}, {product_id:1}).sort({time:1});

    let productIds=cartItems.map((product)=>{return product.product_id});

    let products=await product_info.find({_id:{$in: productIds}}, {_id:1, produt_name:1, product_short_discription:1, product_picture1:1, product_price:1, product_discount:1, product_discount_price:1, size_availablity:1});

// console.log(products)
res.status(200).json({products:products})

    }catch(err){
        recordErr('get_cart_details_per_user',err);
        console.log(err);     
        res.status(400).send('something went wrong');
    }
};

   
exports.place_order= async(req,res)=>{
    try{
    
        // CSRF
    let {address, productId, productSelectedSize, productPrice, productQuanitity, totalBill, currency}=req.body;
    
    let productInformation=await product_info.findOne({_id:productId}, {produt_name:1 ,product_picture1:1});
    
    
    let orderData={user_id:req.user.user_id, product_id:productId,quantity:productQuanitity,  product_size:productSelectedSize, currency:currency, product_price:productPrice, totalBill:totalBill, address:address, product_name:productInformation? productInformation.produt_name:'', product_img:productInformation? productInformation.product_picture1:''};
    
    await orders_info.create(orderData);
    res.status(200).send('200');
    
    }catch(err){
        recordErr('place_order',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};


exports.buy_whole_cart= async(req,res)=>{
    try{
    // CSRF
    
    let {productDetails, address}=req.body;
    
    let productNameImg=[];
    for(let i=0; i<productDetails.length; i++){
        
        let productInformation=await product_info.findOne({_id:productDetails[i].product_id}, {produt_name:1 ,product_picture1:1});
    
        productNameImg.push({name:productInformation? productInformation.produt_name:'', img:productInformation?productInformation.product_picture1:''})
    
    }
    
    
    let orderInfo=productDetails.map((element, index)=>{
       element.user_id=req.user.user_id;
       element.address=address;
       element.product_name=productNameImg[index].name;
       element.product_img=productNameImg[index].img;
       delete element.productNames;
       return element;
    });
    
    await orders_info.insertMany(orderInfo);
    
    res.status(200).send('200');
    
    }catch(err){
        recordErr('buy_whole_cart',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
};
    