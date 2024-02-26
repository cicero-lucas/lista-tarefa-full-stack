const connection = require('./connection');

const getAll = async () =>{
    try{
        const tasks = await connection.execute('SELECT * FROM tb_tarefas');
        return tasks;
    }catch{
        return "erro na consulta do banco"
    }
};
const createTarefa = async (task) =>{
    try{
        const {title}=task;
    

        const query='INSERT INTO tb_tarefas (m_tarefa) VALUES (?);'
      
        const createTasks = await connection.execute(query,[title]);
        console.log(query)
        return createTasks;
    }catch{
        return "erro ao inserir dados no banco"
    }
};




// delete status 204

const deletarTarefa = async (id) =>{
    try{
        const query = 'delete form tb_tarefas where id_tarefa = ?';
        const deletar= await connection.execute(query,[id]);

        return deletar;
    }catch{
        return "erro ao deletar"
    }
    
}

const atualizarTarefa = async (id,task) =>{
    try{
        const {title, status}= task;

        const query= 'UPDATE tb_tarefa set tb_t = "?", tb_status = ? WHERE id_tarefas = ?;'
        const atualizar= await connection.execute(query,[title,status,id]);

        return atualizar;
    }catch{
        return "erro ao atualizar";
    }
    

}



module.exports={
    getAll,
    createTarefa,
    deletarTarefa,
    atualizarTarefa
};