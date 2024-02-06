const Joi = require('joi')

const userTable = require('./user');
const user = userTable({Joi})

const labelTable = require('./label');
const label = labelTable({Joi})

const emailTable = require('./email-entities');
const emailEntities = emailTable({Joi})

const emailAssociation = require('./email-association');
const emailAssociationEntities = emailAssociation({Joi});

const emailRecipient = require('./email-receipient');
const emailRecipientEntities = emailRecipient({Joi});

const emailAttachment = require('./email-attachment');
const emailAttachmentEntities = emailAttachment({Joi});

module.exports={
    user,
    label,
    emailEntities,
    emailAssociationEntities,
    emailRecipientEntities,
    emailAttachmentEntities,
}