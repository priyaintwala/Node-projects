function makegetDataOfAttachment({Joi}){
   return async function getDataofAttachment(data,msgid) {
    let attechmentDataPath = '/home/ad.rapidops.com/priya.intwala/Desktop/emailAttachmentFolder';
    let path, name, size, type;
    let filename=data.mimeType
    filedata = filename.split('/');
    type = filedata[filedata.length-1];
    name = data.filename ;
    size = data.body.size ;
    path = attechmentDataPath+msgid+name ;
    let attachmentData = data.body.attachmentId;
   
    attachmentData = attachmentData.replace(/-/g, "+");
    attachmentData = attachmentData.replace(/_/g, "/");
  
    const textstr = Buffer.from(attachmentData, 'base64').toString('binary');
    await  fs.writeFileSync(path, textstr, 'binary');
  
    return Object.freeze({
        name,
        size,
        path,
        type
    })
  }

  function validateInput(input){
    const schema = Joi.object({
        data:Joi.string(),
        msgid:Joi.string(),
    });
    const {error,value}= schema.validate(input);
    if(error)  {throw (error.details[0].message);
    }
    return value;
}
}