const express = require('express');
const tasksController=require("../controllers/tasksController")
const tasksMiddleware = require('../middlewares/taskesMiddlewares');


const router= express.Router();

router.get('/',tasksController.index)

router.get('/tasks', tasksController.vertarefa);

router.post('/tasks', tasksMiddleware.validateTitle, tasksController.createTarefa);

router.delete('/tasks/:id',tasksController.deletarTarefa);

router.put('/tasks/:id', tasksMiddleware.validateTitle, tasksMiddleware.validateStadus,tasksController.atualizarTarefa);



module.exports=router;