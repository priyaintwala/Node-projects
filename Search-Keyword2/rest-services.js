
const express = require('express');
const controller = require('./controller');

console.log("in rest services");

const router = express.Router();

router.get("/",controller.formController)

router.post("/",controller.formSubmitController)

module.exports = router;
