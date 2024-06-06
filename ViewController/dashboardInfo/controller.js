const dashboard_info=require('../../db_schemas/dashboard_info.js');

const recordErr=require('../../middleWare/recordErrors');

exports.add_dashboard_main_banner_details=async(req, res)=>{
    try{
        
        let file_name=req.file ? req.file.filename:null;
        let mainHeading=req.body.mainHeading;
        let mainSubText=req.body.mainSubText;
        let mainTextFontColor=req.body.mainTextFontColor;

let primaryObject={}
if(file_name){
primaryObject.main_background_image=file_name;
}

if(mainHeading && mainHeading!==''){
primaryObject.main_background_text=mainHeading;
}

if(mainSubText && mainSubText!==''){
primaryObject.main_background_sub_text=mainSubText;
}

if(mainTextFontColor && mainTextFontColor!==''){
primaryObject.main_background_font_color=mainTextFontColor;
}


await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {...primaryObject});

res.status(200).send('200');

    }catch(err){
        recordErr('add_dashboard_main_banner_details',err);
        console.log(err);
        res.status(400).send('something went wrong');
    }
}


exports.get_dashboard_data=async(req,res)=>{
    try{
        
    let dashboard_data=await dashboard_info.findOne({dashboard:'Main Dashboard'});
    
    res.status(200).json({dashboard_info:dashboard_data});
    
    }catch(err){
        recordErr('get_dashboard_data',err);
        console.log(err);
        res.status(400).send('something went wrong');
}};

exports.setTextBanner=async(req, res)=>{
    try{

        let {smallHeadingText, largeHeadingText, normalHeadingText, headingLink}=req.body
    
        let baseObject={};
    
        if(smallHeadingText && smallHeadingText!==''){
            baseObject.small_heading_text=smallHeadingText;
        }
        if(largeHeadingText && largeHeadingText!==''){
            baseObject.large_heading_text=largeHeadingText;
        }
     
        if(normalHeadingText && normalHeadingText!==''){
            baseObject.normal_heading_text=normalHeadingText;
        }
    
        if(headingLink && headingLink!==''){
            baseObject.heading_link=headingLink;
        }
    
        await dashboard_info.updateOne({dashboard:'Main Dashboard'}, {...baseObject});
     
        res.status(200).send('200');
    
    }catch(err){
        recordErr('setTextBanner',err);
        console.log(err);
        res.status(400).send('something went wrong');
}}