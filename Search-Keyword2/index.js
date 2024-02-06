const express = require("express");
const router = require('./rest-services');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/',router);

const port = 5000;
app.listen(port,()=>{
    console.log(`Services is running on  http://localhost:${port}`);
})