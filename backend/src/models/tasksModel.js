const connection = require('./connection');

const getAll = async () =>{
    try{
        const tasks = await connection.execute('SELECT * FROM tb_tarefa where id_tarefa =1');

        return tasks;
    }catch{
        return "erro na consulta do banco"
    }
};
const crieteTarefa = async (dados) =>{
    try{
        const query='INSERT INTO tb_tarefa () values(?)'
        const tasks = await connection.execute(query,[dados]);

        return tasks;
    }catch{
        return "erro na consulta do banco"
    }
};

module.exports={
    getAll
};