const config = require("../config/development");

const {
  getUserDataAccess,
  addusertoDataAccess,
  getuserByIdDataAccess,
  deleteuserByIdDataAccess,
  updateuserDataAccess,
  userExistDataAccess,
  getUserfromExpiresDataAccess,
  updateAllDataDataAccess,
} = require("./userDb");

const {
  addLabels,
  getLabelsById,
  deleteLabels,
  updateLabels,
  updateProvidersId,
  updateLabelData,
  getPriorityLabel,
  getLabelId
} = require("./label");

const {insertEmails,getEmailData}= require('./emailDb')

const {insertEmailFolderAssociationData,getEmailFolderAssociationData}= require('./emailAssociation')

const {insertEmailRecipientData,getEmailRecipientData}= require('./emailRecipient')

const {insertAttachmentData,getAttachmentData} = require('./emailAttachments')

module.exports = {
  getUserDataAccess,
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
  updateLabelData,
  getPriorityLabel,
  getLabelId,
  insertEmails,
  getEmailData,
  insertEmailFolderAssociationData,getEmailFolderAssociationData,
  insertEmailRecipientData,getEmailRecipientData,
  insertAttachmentData,getAttachmentData
};
