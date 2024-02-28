const tasksModel= require('../models/tasksModel')

const index=(req,res)=>{
    return res.json({menssagem:"pagian fuc"});
}


const vertarefa= async(_request,response)=>{
    const [tasks] = await tasksModel.getAll();
    response.json(tasks);
};

const createTarefa = async (request, responde) => {
    const createdTasks = await tasksModel.createTarefa(request.body);
   
    return responde.status(201).json(createdTasks);
}
const deletarTarefa= async (request, responde) => {
   
    const {id} = request.params;
    await tasksModel.deletarTarefa(id);
    return responde.status(204).json();
}
const atualizarTarefa= async (request, responde) => {
    const {id} = request.params;
    await tasksModel.atualizarTarefa(id,request.body);
    return responde.status(204).json();
}

module.exports={
    index,
    vertarefa,
    createTarefa,
    deletarTarefa,
    atualizarTarefa
}