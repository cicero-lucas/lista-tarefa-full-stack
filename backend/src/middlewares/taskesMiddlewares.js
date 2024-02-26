const { response } = require("express");


const validateTitle =(request,response, next) => {
    const { body } = request;
    if(body.title === undefined){
       return response.status(400).json({menssagem:"o campo titulo e obrigatorio"})
    }else if(body.title === ""){
        return response.status(400).json({menssagem:"o campo titulo não pode ser vazio"})
    }

    next();
};
const validateStadus =(request,response, next) => {
    const { body } = request;
    if(body.status === undefined){
       return response.status(400).json({menssagem:"o campo status e obrigatorio"})
    }else if(body.status === ""){
        return response.status(400).json({menssagem:"o campo status não pode ser vazio"})
    }

    next();
};

module.exports ={
    validateTitle,
    validateStadus
};