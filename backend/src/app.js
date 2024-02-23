const express = require("express");
const Rota  = require("./routes/rota");
require('dotenv').config();

const app=express();
app.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin","http://localhost:5000");
    response.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    response.header("Access-Control-Allow-Headers","Authorization,Content-Type,x-type-request"
    );
    response.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(express.json())
app.use(Rota);

app.listen(process.env.PORT);