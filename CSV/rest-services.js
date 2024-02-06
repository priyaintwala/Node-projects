
const express = require('express');
const controller = require('./controller');

console.log("in rest services");

const router = express.Router();

router.get('/user/:id',controller.getUserByIdController);

module.exports = router;
