const Joi = require('joi');
const fs = require('fs');
const nodemailer = require('nodemailer');
const fetch = require("node-fetch");
const path = require("path");
const Redis = require('ioredis');
const redis = new Redis();


const {getUserDataAccess,
    addusertoDataAccess,
    getuserByIdDataAccess,
    deleteuserByIdDataAccess,
    updateuserDataAccess,
    userExistDataAccess,
    getUserfromExpiresDataAccess,
    updateAllDataDataAccess,
    addLabels,
    getLabelsById,
    deleteLabels,
    updateLabels,
    updateProvidersId,
    getLabelId,
    getPriorityLabel,
    insertEmails,updateLabelData,insertEmailFolderAssociationData,getEmailFolderAssociationData,insertEmailRecipientData,getEmailRecipientData,insertAttachmentData,getAttachmentData,getEmailData} =require('../data-access/index')

const { user,label,emailEntities,emailAssociationEntities,emailRecipientEntities,emailAttachmentEntities}= require('../entities/index');

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "email-folder",
    brokers: ["localhost:9092"],
  });

const makegetUserByIdRedisUsecase = require('./get-user-redis-usecase');
const getuserByIdRedisUsecase = makegetUserByIdRedisUsecase({redis})

const makeupdateUserRedisUsecase = require('./update-user-redis-usecase');
const updateUserRedisUsecase = makeupdateUserRedisUsecase({redis})

const makeaddUserRedisUsecase = require('./adduser-redis-usecase');
const addUserRedisUsecase = makeaddUserRedisUsecase({redis})



const makeAddLabelskafka = require('./add-label-producer');
const addLabelkafka = makeAddLabelskafka({kafka});

const makeDeleteLabels = require('./delete-label-Usecase')
const deleteLabel = makeDeleteLabels({deleteLabels,Joi})

const makeUpdateLabels = require('./update-label-usecase')
const updateLabel = makeUpdateLabels({updateLabels,Joi,label})

const makeUserExistedUsecase = require('./user-existed-usecase')
const userExistUsecase = makeUserExistedUsecase({userExistDataAccess,Joi})

const makeidExistedUsecase = require('./id-existed-usecase')
const idExistedUsecase =makeidExistedUsecase({getuserByIdDataAccess,Joi})

const makegetLabelsById = require('./getlabels-byid')
const getLabelById = makegetLabelsById({getLabelsById,Joi})

const makeAddLabels = require('./add-labels')
const addLabel = makeAddLabels({addLabels,Joi,label,getLabelById,updateProvidersId})

const makegetUserByIdUsecase =  require("./getUserByIdUsecase")
const getUserByIdUsecase = makegetUserByIdUsecase({getuserByIdDataAccess,Joi,idExistedUsecase,getLabelsById:getLabelById,getuserByIdRedisUsecase})

const makeaddUserUsecase = require('./addUserUsecase')
const addUserUsecase = makeaddUserUsecase({addusertoDataAccess,Joi,userExistUsecase, addLabels:addLabel,user,addLabelkafka,redis,addUserRedisUsecase})

const makegetuserUsecase = require('./getUserUsecase')
const getUserUsecase = makegetuserUsecase({getUserDataAccess,Joi,getLabelsById:getLabelById,redis})

const makedeleteUsecase = require('./deleteUserUsecase')
const deleteUserUsecase = makedeleteUsecase({deleteuserByIdDataAccess,Joi,idExistedUsecase,redis})

const makeUpdateUserUsecase = require('./updateUserUsecase')
const updateUserUsecase =  makeUpdateUserUsecase({updateuserDataAccess,Joi,user,redis,updateUserRedisUsecase})

const makeAddEmails = require('./add-emails-usecase')
const addEmails = makeAddEmails({Joi,emailEntities,insertEmails})

const makeUpdateGmailLabel = require('./update-gmail-label-usecase')
const updateGmailLabels = makeUpdateGmailLabel({Joi,updateLabelData})

const makeemailFolderAssociation = require('./email-association-usecase')
const emailFolderAssociation = makeemailFolderAssociation({ Joi, emailAssociationEntities,insertEmailFolderAssociationData })

const makeEmailRecipient = require('./email-recipient-usecase')
const emailReceipient = makeEmailRecipient({ Joi, emailRecipientEntities, insertEmailRecipientData})

const makeEmailAttachment = require('./email-attachment-usecase')
const emailAttachment = makeEmailAttachment({ Joi, emailAttachmentEntities, insertAttachmentData })

const makegetLabelId = require('./get-labelid-usecase')
const LabelId = makegetLabelId({ Joi, getLabelId })

const makegetPriorityLabel = require('./get-priority-label-usecase')
const PriorityLabel = makegetPriorityLabel({Joi,getPriorityLabel})

const makeFetchDetailFromMail = require('./fetch-details-from-mail-usecase')
const fetchDetailsFromMail = makeFetchDetailFromMail({Joi})

const makegetAttachment = require('./get-attachment-usecase')
const getAttachment = makegetAttachment({Joi,fs})

const makeGetRecipient = require('./get-recipient-usecase')
const getRecipient = makeGetRecipient({Joi})

// const makeaddEmailsData = require('./consumer-usecase')
// const addEmailData = makeaddEmailsData({fetchDetailsFromMail,addEmails,updateGmailLabels,emailFolderAssociation,emailReceipient,emailAttachment,LabelId,PriorityLabel,getRecipient})

const makeConsumerUsecase = require('./consumer-usecase')
const consumerUsecase = makeConsumerUsecase({getUserByIdUsecase ,fetchDetailsFromMail,addEmails,updateGmailLabels,emailFolderAssociation,emailReceipient,emailAttachment,LabelId,PriorityLabel,getRecipient,getAttachment,getEmailData})

const makegetUserFromExpiresUsecase = require('./get-user-from-expires-usecase')
const getUserFromExpiresUsecase = makegetUserFromExpiresUsecase({Joi,getUserfromExpiresDataAccess})


const makeupdateAllDataUsecase = require('./update-all-data-usecase')
const updateAllDataUsecase = makeupdateAllDataUsecase({ Joi, updateAllDataDataAccess,user })

const makecronJobUsecase = require('./cron-job-usecase')
const cronJobUsecase = makecronJobUsecase({ Joi ,updateAllDataUsecase,getUserfromExpiresDataAccess})

const makesendEmailUsecase = require('./sent-email-usecase')
const sendEmailUsecase = makesendEmailUsecase({Joi,nodemailer,getUserByIdUsecase})

const makesentEmailanotherUsecase = require('./sent-email-another-usecase')
const sentEmailanotherUsecase = makesentEmailanotherUsecase({Joi,fs,fetch,getUserByIdUsecase,path})


module.exports={
    addUserUsecase,
    getUserUsecase,
    getUserByIdUsecase,
    deleteUserUsecase,
    updateUserUsecase,
    addLabel,
    userExistUsecase,
    idExistedUsecase,
    getLabelById,
    deleteLabel,
    updateLabel,
    LabelId,
    PriorityLabel,
    addEmails,
    updateGmailLabels,
    emailFolderAssociation,
    emailReceipient,
    emailAttachment,
    fetchDetailsFromMail,
    getAttachment,
    getRecipient,
    getUserFromExpiresUsecase,
    consumerUsecase,
    cronJobUsecase,
    updateAllDataUsecase,
    sendEmailUsecase,
    sentEmailanotherUsecase,
}