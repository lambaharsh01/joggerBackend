const express=require('express');
const route=express.Router();

const controller=require('./controller.js');

route.post('/api_get_all_tasks',controller.api_get_all_tasks);


route.post('/update_task_complision', controller.update_task_complision);

    
route.post('/delete_task', controller.delete_task);


route.post('/insert_new_task', controller.insert_new_task);


route.post('/get_month_events', controller.get_month_events);

module.exports=route;