const {readFileExcelUsecase,addProductInExcelUsecase} = require('../usecase')
const fs = require('fs');
// console.log(readFileExcelUsecase);
console.log("in contrller index");

const makereadFileExcelController = require('./read-excel-file-controller');
const readExcelFileController = makereadFileExcelController({readFileExcelUsecase})

const makeaddProductInExcelController = require('./add-excel-controller');
const addProductInExcelController = makeaddProductInExcelController({addProductInExcelUsecase})

const makecsvFileController = require('./csv-file-controller')
const csvFileController = makecsvFileController({fs})

module.exports={
    readExcelFileController,
    csvFileController,
    addProductInExcelController
}