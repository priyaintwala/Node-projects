function addAttachment({ Joi, emailAttachmentEntities, insertAttachmentData }) {
    return async function attachment({messageId,fileName,filePath,fileType,fileSize}) {
      try {
        console.log("in usecase of attachemnt",messageId,fileName,filePath,fileType,fileSize)
        let value = validateInput({ messageId,fileName,filePath,fileType,fileSize})
  
        const entities = await emailAttachmentEntities({
            messageId:value.messageId,
            fileName:value.fileName,
            filePath:value.filePath,
            fileType:value.fileType,
            fileSize:value.fileSize,
        })

        messageId = entities.getMessageId();
        fileName = entities.getFileName();
        filePath = entities.getFilePath();
        fileType = entities.getFileType();
        fileSize = entities.getFileSize();
  
        let resultData = await insertAttachmentData({
          messageId,fileName,filePath,fileType,fileSize
        })
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
        fileName:Joi.string().allow(""),
        filePath:Joi.string().allow(""),
        fileType:Joi.string().allow(""),
        fileSize:Joi.number().integer().allow(""),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }
  }
  module.exports = addAttachment;