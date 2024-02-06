const {getUserByIdUsecase} = require('../usecase')

const makegetUserByIdController = require('./getusercsv');
const getUserByIdController = makegetUserByIdController({getUserByIdUsecase})

module.exports={getUserByIdController}