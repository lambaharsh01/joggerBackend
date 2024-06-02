let mongoose=require('mongoose');

let dashboard_contents=new mongoose.Schema({

dashboard:String,

main_background_image:String,
main_background_text:String,
main_background_sub_text:String,
main_background_font_color:String,
main_background_link:String,

first_slider_heading:String,
first_slider:String,

fetured_product_1_id:String,
fetured_product_1_name:String,
fetured_product_1_img:String,
fetured_product_1_heading:String,
fetured_product_1_font_color:String,
fetured_product_1_button_color:String,
fetured_product_1_button_font_color:String,

second_slider_heading:String,
second_slider:String,

fetured_product_2_id:String,
fetured_product_2_name:String,
fetured_product_2_img:String,
fetured_product_2_heading:String,
fetured_product_2_font_color:String,
fetured_product_2_button_color:String,
fetured_product_2_button_font_color:String,

small_heading_text:String,
large_heading_text:String,
normal_heading_text:String,
heading_link:String,


});

let dashboard_info=new mongoose.model('dashboard_info',dashboard_contents);

module.exports=dashboard_info;


