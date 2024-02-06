const express = require("express");
const router = require('./rest-services');

const app = express();
app.use(express.json());

app.use('/',router);

const port = 5000;
app.listen(port,()=>{
    console.log(`Services is running on port ${port}`);
})