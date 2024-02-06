
const mysql = require("mysql2")
const config = require("../config/development")

console.log("in data access index");

let connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}).promise();

const makegetUserById = require('./userDb');
const getUserByIdDataAccess =  makegetUserById({connection})

module.exports= {getUserByIdDataAccess};