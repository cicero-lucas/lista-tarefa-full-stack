const express = require('express');
const fucTasck=require("../controllers/tasksController")


const router= express.Router();

router.get('/tasks', fucTasck.fucTasck);

module.exports=router;