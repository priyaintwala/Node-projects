function attachmentEntities({Joi}){
    return async function attchmntEntity({messageId,fileName,filePath,fileType,fileSize,}){
        const schema = Joi.object({
            messageId:Joi.string().required(),
            fileName:Joi.string().allow(""),
            filePath:Joi.string().allow(""),
            fileType:Joi.string().allow(""),
            fileSize:Joi.number().integer().allow(""),
        });
        const {value, error} = schema.validate({
            messageId,
            fileName,
            filePath,
            fileType,
            fileSize,
        });
        if (error) {
            console(error,"Error")
            throw error.details[0].message;
          }
      
        return Object.freeze({
            getMessageId:()=>value.messageId,
            getFileName:()=>value.fileName,
            getFilePath:()=>value.filePath,
            getFileType:()=>value.fileType,
            getFileSize:()=>value.fileSize
        });
  }
}
module.exports=attachmentEntities;