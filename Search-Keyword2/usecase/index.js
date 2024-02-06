const XLSX = require('xlsx');
const fetch = require('node-fetch')

const path = require('path');

const puppeteer = require('puppeteer');


const makeaddDataInExcelUsecase = require('./add-data-in-excel')
const addDataInExcelUsecase = makeaddDataInExcelUsecase({XLSX,path})

const makesearchWordUsecase = require('./search-word-on-website')
const searchWordUsecase = makesearchWordUsecase({fetch,puppeteer})

const makeformSubmitUsecase = require('./form-submit-usecase');
const formSubmitUsecase = makeformSubmitUsecase({addDataInExcelUsecase,searchWordUsecase})

module.exports={formSubmitUsecase,addDataInExcelUsecase,searchWordUsecase}