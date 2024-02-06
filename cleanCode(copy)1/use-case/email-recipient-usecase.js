function addEmailRecipient({ Joi, emailRecipientEntities, insertEmailRecipientData }) {
    return async function ({ messageId, emailAddress, typeOf}) {
      try {
        console.log("in usecase of email recipient",messageId,emailAddress,typeOf)
        let value = validateInput({ messageId,emailAddress,typeOf})
  
        const entities = await emailRecipientEntities({
          messageId: value.messageId,
          emailAddress: value.emailAddress,
          typeOf: value.typeOf,
        })
        messageId = entities.getMessageId();
        emailAddress = entities.getEmailAddress();
        typeOf = entities.getTypeOf();
  
        let resultData = await insertEmailRecipientData({
        messageId,emailAddress,typeOf
        })
        console.log(resultData, "result");
  
        return resultData;
      }
      catch (error) {
        console.log(error, "error");
        throw new Error(error);
      }
    }

    function validateInput(input){
        const schema = Joi.object({
            messageId:Joi.string().required(),
            emailAddress:Joi.string().allow(""),
            typeOf:Joi.string().allow(""),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }
  
    }
  
  module.exports = addEmailRecipient;