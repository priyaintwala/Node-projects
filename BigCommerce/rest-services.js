
const express = require('express');
const controller = require('./controller');

console.log("in rest services");

const router = express.Router();

// router.post('/addproduct',controller);
router.post("/api/v1", controller.readExcelFileController)

router.get("/download/:filename",controller.csvFileController)

router.get("/excel",controller.addProductInExcelController)

// router.post('/api/v1',controller.readExcelFileController);

module.exports = router;
