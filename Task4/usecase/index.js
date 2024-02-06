const xlsx = require('xlsx');
const fetch = require('node-fetch')

const makegetProductApiUsecase = require('./get-products-api-usecase');
const getProductApiUsecase = makegetProductApiUsecase({fetch})

const makegetBrandsUsecase = require('./get-brand-of-product-usecase');
const getBrandsUsecase = makegetBrandsUsecase({fetch,getProductApiUsecase,xlsx})

const makeaddProductInExcelUsecase = require('./add-Product-usecase');
const addProductUsecase = makeaddProductInExcelUsecase({getBrandsUsecase})

module.exports={addProductUsecase,getBrandsUsecase}