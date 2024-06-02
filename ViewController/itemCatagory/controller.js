const items_catagory=require('../../db_schemas/items_catagory.js');
const product_info=require('../../db_schemas/product_info');

const recordErr=require('../../middleWare/recordErrors.js');

exports.getHeaders= async(req,res)=>{
    try{
      let headerNewRelease=await individualHeaders('New Release');
      let headerMen=await individualHeaders('Men');
      let headerWomen=await individualHeaders('Women');
      let headerKids=await individualHeaders('Kids');

      let allTheProducts=await product_info.find({},{_id: 1, produt_name: 1, product_picture1: 1});
  
      res.status(200).json({headers:[headerNewRelease, headerMen, headerWomen, headerKids], products:allTheProducts})  

    }catch(err){
        recordErr('get_headers',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.getPerCatagory= async(req,res)=>{
    try{

        let mainCatagory=req.body.mainCatagory;
        let catagory=req.body.catagory;


        let allCategories=[];
        let allSubCategories=[];
        if(mainCatagory){
                allCategories=await get_categories_per_main_categories(mainCatagory);
                allSubCategories=await get_sub_categories_per_categories(mainCatagory, catagory);
                res.status(200).json({
                    allCategories:allCategories,
                    allSubCategories:allSubCategories 
                })
        }else{
            res.status(404);
        }


    }catch(err){
        recordErr('get_per_catagory',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}

exports.saveHeader=async(req,res)=>{
    try{
// admin task
        let{header, mainHeading, subHeading}=req.body;
        
        // CSRF
        let stringedCatagory=JSON.stringify(mainHeading);
        let stringedSubCatagory=JSON.stringify(subHeading);

        if(header=='New Release' || header=='Men' || header=='Women' || header=='Kids'){

        let existing= await items_catagory.findOne({main_catagory:header});
        if(existing){
        // update
        await items_catagory.updateOne({main_catagory:header}, {catagory:stringedCatagory, sub_catagory:stringedSubCatagory});
        
        }else{
        // insert
        await items_catagory.create({main_catagory:header, catagory:stringedCatagory, sub_catagory:stringedSubCatagory});
        }

        res.status(200).send('200');
        }else{
        res.status(409);
        }
        

    }catch(err){
        recordErr('saveHeaders',err);
        console.log(err)
        res.status(400).send('something went wrong');
    }
}


//SUPPORT FUNCTIONS
async function individualHeaders(header){

    let categories=await items_catagory.findOne({main_catagory:header});

    if(!categories){
        return [];
    }else{
        return {catagory:JSON.parse(categories.catagory),
               sub_catagory:JSON.parse(categories.sub_catagory)}
    }
}

async function get_categories_per_main_categories(mainCatagory){
    if(mainCatagory){

        let get_all_categories=await items_catagory.findOne({main_catagory:mainCatagory});
        let categories=[];
        if(get_all_categories){
            categories=JSON.parse(get_all_categories.catagory);
        }
        return categories;
    }else{
        return [];
    }
}


async function get_sub_categories_per_categories(mainCatagory, catagory){

    if(mainCatagory && catagory){
    
        
        let get_all_sub_categories=await items_catagory.findOne({main_catagory:mainCatagory});
        let categories=[];
        let sub_categories=[];
        
        if(get_all_sub_categories){
            categories=JSON.parse(get_all_sub_categories.catagory);
            let catagoriy_index=categories.indexOf(catagory);
            let temp_sub_categories=JSON.parse(get_all_sub_categories.sub_catagory);
            sub_categories=temp_sub_categories[catagoriy_index];
        }
        return sub_categories;
    }else{
        return [];
    }
}