const express = require("express");
const router = require('./rest-services');

// const UmzugMigration = require('./migration')

const app = express();
app.use(express.json());

app.use('/',router);

// const Sequelize = require("sequelize");
// const {Umzug,SequelizeStorage} = require('umzug');

// const sequelize = new Sequelize("bigCommerce","root","Mahi*0106",{
//     dialect: "mysql",
// });

// const umzug = new Umzug({
//     migrations:{glob:'migrations/*.js'},
//     context: sequelize.getQueryInterface(),
//     storage: new SequelizeStorage({sequelize}),
//     logger: console
// });

// umzug.up().then(()=>{
//     console.log("All migrations are uodated");
// })
// .catch((err)=>{
//     console.log('error',err);
// })

const port = 5000;
app.listen(port,()=>{
    console.log(`Services is running on port ${port}`);
})