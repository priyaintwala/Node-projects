function addEmailFolderAssociation({ Joi, emailAssociationEntities,insertEmailFolderAssociationData }) {
    return async function emailFolderAssociation({  messageId,labelId}) {
      try {
        console.log("in usecase",messageId,labelId)
        let value = validateInput({ messageId,labelId})
  
        const entities = await emailAssociationEntities({
          messageId: value.messageId,
          labelId: value.labelId,
        })
        messageId = entities.getMessageId();
        labelId = entities.getLabelId();
        
        
          let resultData = await insertEmailFolderAssociationData({messageId,labelId})
          console.log(resultData, "result");
    
          return resultData;
         
       
      }
      catch (e) {
        console.log(e, "error");
        throw new Error(e);
      }
    }
    function validateInput(input){
        const schema = Joi.object({
            messageId:Joi.string().required(),
            labelId:Joi.string().allow(""),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);}return value;
    }
    
  
    }
  
  module.exports = addEmailFolderAssociation;