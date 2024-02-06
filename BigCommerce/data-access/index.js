console.log("data access index");

const mysql = require("mysql2")
const config = require("../config/development")

let connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
});

const makecreateProduct = require('./productDb');
const createProductDataAccess = makecreateProduct({connection})

module.exports= {createProductDataAccess};