const {addProductUsecase} = require('../usecase')

const makeaddProductExcel = require('./add-product-inexcel')
const addProductExcelController = makeaddProductExcel({addProductUsecase});

module.exports={addProductExcelController}