function emailRecipientEntities({Joi}){
    return async function emailReceipient({messageId,emailAddress,typeOf}){
        const schema = Joi.object({
            messageId:Joi.string().required(),
            emailAddress:Joi.string().allow(""),
            typeOf:Joi.string().allow(""),
        });
        const {value, error} = schema.validate({
            messageId,
            emailAddress,
            typeOf
        });
        if (error) {
            console(error,"Error")
            throw error.details[0].message;
          }
      
        return Object.freeze({
            getMessageId:()=>value.messageId,
            getEmailAddress:()=>value.emailAddress,
            getTypeOf:()=>value.typeOf,
        });
  }
}
module.exports=emailRecipientEntities;