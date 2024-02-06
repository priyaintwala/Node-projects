const express = require('express');
const cors = require('cors');

const app = express();

const restService =  require("./rest-service");
// const umzugMigration = require('./migration')

const handler = require('./handlers/addlabel-consumer')
const handler3 = require('./handlers/gmail-mail-add-to-database')
// const handler1 = require('./handlers/gmail-emails-consumer')
// const handler2 = require('./handlers/gmail-mails-consumer')

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/',restService);

app.listen(4007,()=>{
    console.log("server is running on port http://localhost:4007");
})
