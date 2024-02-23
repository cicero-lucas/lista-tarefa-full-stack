require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USUARIO,
    password: process.env.DB_SENHA,
    database: process.env.DB_NOME,
    port: process.env.DB_PORTA
});

module.exports = connection;
