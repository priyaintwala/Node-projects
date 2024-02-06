const {formSubmitUsecase} = require('../usecase')
const fetch = require('node-fetch');

const makeform = require('./form-controller');
const formController = makeform()

const makeformSubmit = require('./submit-controller')
const formSubmitController = makeformSubmit({formSubmitUsecase,fetch});

module.exports={formSubmitController,formController}

