const {getUserByIdDataAccess} = require('../data-access')
const fs = require('fs');

const makegetUserByIdUsecse = require('./get-user-id');
const getUserByIdUsecase = makegetUserByIdUsecse({getUserByIdDataAccess,fs})

module.exports={getUserByIdUsecase}