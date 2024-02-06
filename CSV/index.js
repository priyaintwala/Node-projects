const express = require("express");
const router = require('./rest-services');

const controller = require('./controller')

// const UmzugMigration = require('./migration')

const app = express();
app.use(express.json());

app.use('/',router);

const port = 4000;
app.listen(port,()=>{
    console.log(`Services is running on port ${port}`);
})