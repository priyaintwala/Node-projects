function emailFolderAssociationEntities({Joi}){
    return async function folders({messageId,labelId}){
        const schema = Joi.object({
            messageId:Joi.string().required(),
            labelId:Joi.string().allow(""),
            
        });
        const {value, error} = schema.validate({
            messageId,
            labelId
        });
        if (error) {
            console(error,"Error")
            throw error.details[0].message;
          }
      
        return Object.freeze({
            getMessageId:()=>value.messageId,
            getLabelId:()=>value.labelId,
        });
  }
}
module.exports=emailFolderAssociationEntities;