const Joi = require('joi');
const {Kafka} = require('kafkajs')

const {addUserUsecase, getUserUsecase, getUserByIdUsecase,  deleteUserUsecase, updateUserUsecase,deleteLabel,updateLabel,addLabel,sendEmailUsecase,sentEmailanotherUsecase} = require('../use-case')

const makekafkaAddLabelController = require('./producer-controller');
const kafkaAddLabelController = makekafkaAddLabelController({Kafka})

const makeaddUserController = require('./addUserController');
const addUserController = makeaddUserController({Joi,addUserUsecase,kafkaAddLabelController})

const makeaddLabelController = require('./add-label-conroller');
const addLabelController = makeaddLabelController({Joi,addLabel})

const makegetUserController = require('./getUserController');
const getUserController = makegetUserController({getUserUsecase,Joi})

const makegetUserByIdController = require('./getUserByIdController');
const getUserByIdController = makegetUserByIdController({Joi,getUserByIdUsecase})

const makedeleteUserController = require('./deleteUserController');
const deleteUserController = makedeleteUserController({Joi,deleteUserUsecase})

const makeUpdateUserController = require('./updateUserController');
const updateUserController = makeUpdateUserController({updateUserUsecase,Joi})

const makeDeleteLabelController = require('./deleteLabelController');
const deleteLabelController = makeDeleteLabelController({deleteLabelUsecase:deleteLabel,Joi})

const makeUpdateLabelController = require('./updateLabelController');
const updateLabelController = makeUpdateLabelController({updateLabel,Joi})
// console.log(updateLabelController);

const makesendEmailController = require('./sent-email-controller');
const sendEmailController = makesendEmailController({Joi,sendEmailUsecase,sentEmailanotherUsecase})

module.exports={addUserController,
    getUserController,
    getUserByIdController,
    deleteUserController,
    updateUserController,
    deleteLabelController,
    updateLabelController,
    addLabelController,
    sendEmailController,
    }