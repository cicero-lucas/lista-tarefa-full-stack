const tasksModel= require('../models/tasksModel')

const fucTasck= async(request,response)=>{
    const [tasks] = await tasksModel.getAll();
    response.json(tasks);
};

module.exports={
    fucTasck
}