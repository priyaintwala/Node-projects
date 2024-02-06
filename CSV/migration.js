const Sequelize = require("sequelize");
const {Umzug,SequelizeStorage} = require('umzug');

const sequelize = new Sequelize("Data","root","Mahi*0106",{
    dialect: "mysql",
});

const umzug = new Umzug({
    migrations:{glob:'migrations/*.js'},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
    logger: console
});

umzug.up().then(()=>{
    console.log("All migrations are uodated");
})
.catch((err)=>{
    console.log('error',err);
})