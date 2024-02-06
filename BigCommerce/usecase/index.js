const xlsx = require('xlsx');
const axios = require('axios')
const fetch = require("node-fetch");
const fs = require('fs');

const ExcelJS = require('exceljs');
// const csvWriter = require('csv-write-stream');

const {createProductDataAccess} = require('../data-access')
console.log("!!!!!!!@@@@@@@22",createProductDataAccess);

const makeaddProductInDB = require('./add-product-in-db-usecase')
const addProductInDBUsecase = makeaddProductInDB({createProductDataAccess})

const makeaddVariantInDbUsecase = require('./add-variant-in-db')
const addVariantInDb = makeaddVariantInDbUsecase({createProductDataAccess})

const makegetAllCategoriesUsecase = require('./get-all-categories-usecase');
const getAllCategoriesUsecase = makegetAllCategoriesUsecase({fetch});

const makeaddCategoryApiUsecase = require('./add-category-api-usecase');
const addCategoryApiUsecase = makeaddCategoryApiUsecase({fetch})

const makeaddCategoryUsecase = require('./add-Category-usecase');
const addCategoryUsecase = makeaddCategoryUsecase({getAllCategoriesUsecase,addCategoryApiUsecase})

const makegetAllOptionUsecase = require('./get-all-options-usecase');
const getAllOptionUsecase = makegetAllOptionUsecase({fetch});

const makeaddVariantApiUsease = require('./add-variant-api-usecase');
const addVariantApiUsecase = makeaddVariantApiUsease({fetch , addVariantInDb});

const makecustomFeildUsecase = require('./custom-field-usecase');
const customFieldUsecase = makecustomFeildUsecase()

const makeaddProductApiUsecase = require('./add-product-api-usecase');
const addProductApiUsecase = makeaddProductApiUsecase({fetch,getAllCategoriesUsecase})

const makeaddOptionApiUsecase = require('./add-option-api-usecase');
const addOptionApiUsecase = makeaddOptionApiUsecase({fetch ,getAllOptionUsecase, addVariantApiUsecase});

const makeaddProductInBigCommerceUsecase = require('./add-product-inbigcommerce-usecase');
const addProductInBigCommerceUsecase = makeaddProductInBigCommerceUsecase({addProductApiUsecase,addOptionApiUsecase,customFieldUsecase,addCategoryUsecase,addProductInDBUsecase})

const makereadFileExcelUsecase= require('./read-file-excel-usecase');
const readFileExcelUsecase = makereadFileExcelUsecase({xlsx,addProductInBigCommerceUsecase});

// const makecsvFileUsecase = require('./csv-File-usecase');
// console.log(createProductDataAccess.productcsvFile,"log in index for productcsv");
// // const csvFileUsecase = makecsvFileUsecase({fs,csvWriter,productcsvFile:createProductDataAccess.productcsvFile,variantcsvFile:createProductDataAccess.variantcsvFile})
// const csvFileUsecase = makecsvFileUsecase({fs,csvWriter,createProductDataAccess})

const makegetAllProductsUsecase = require('./get-all-products-usecase');
const getAllProductsUsecase = makegetAllProductsUsecase({fetch});

const makegetAllCustomfeildUsecase = require('./get-all-products-usecase');
const getAllCustomfeildUsecase = makegetAllCustomfeildUsecase({fetch});

const makegetAllCategoriesTreeUsecase = require('./get-categories-tree');
const getAllCategoriesTreeUsecase = makegetAllCategoriesTreeUsecase({fetch})

const makeaddProductInExcelUsecase = require('./add-product-in-excel-usecase');
const addProductInExcelUsecase = makeaddProductInExcelUsecase({getAllProductsUsecase,xlsx,getAllCategoriesTreeUsecase})

module.exports = {
    readFileExcelUsecase,
    addProductInBigCommerceUsecase,
    addProductApiUsecase,
    addOptionApiUsecase,
    getAllOptionUsecase,
    addVariantApiUsecase,
    customFieldUsecase,
    getAllCategoriesUsecase,
    addCategoryApiUsecase,
    addProductInDBUsecase,
    addVariantInDb,
    getAllProductsUsecase,
    getAllCustomfeildUsecase,
    addProductInExcelUsecase,
    getAllCategoriesTreeUsecase
}