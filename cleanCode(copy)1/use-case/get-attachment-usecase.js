function makegetAttachment({Joi,fs}){
    return async function getattachment(emails) {
     console.log("get attachents in usecase console of emails",emails);
        // validateInput(emails)
        let msgId = emails.id
        let type = emails.payload.mimeType;
        let obj = emails.payload;
        let attachmentobj = [];
      
        if (type != "text/plain" && type != "text/html" && type != "multipart/alternative") {
           
            if (type = "multipart/mixed") {
                obj = obj.parts;
                for (let i = 1; i < obj.length; i++) {
                    let attach = await getDataofAttachment(obj[i],msgId);
                    attachmentobj.push(attach);
      
                }
                type = obj[0].mimeType;
                if (type = "multipart/related") {
                    for (let i = 1; i < obj.length; i++) {
                        let attach = await getDataofAttachment(obj[i],msgId);
                        attachmentobj.push(attach);
                    }
                }
            }
            
            else {
                obj = obj.parts;
                for (let i = 1; i < obj.length; i++) {
                    let attach = await getDataofAttachment(obj.parts[i],msgId);
                    attachmentobj.push(attach);
                }
            }
        }
        console.log(attachmentobj,"attachmentobjhich in usecase of attachment usecase");
        return attachmentobj;
      }

    

      async function getDataofAttachment(data,msgid) {
        console.log("data and msgid in data get attachment func ", data, msgid);
        let attechmentDataPath = '/home/ad.rapidops.com/priya.intwala/Desktop/emailAttachmentFolder/';
        let path, name, size, type;
        let filename=data.mimeType
        filedata = filename.split('/');
        type = filedata[filedata.length-1];
        name = data.filename;
        size = data.body.size;
        path = attechmentDataPath+msgid+name;
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
            emails:Joi.string(),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }
}

module.exports=makegetAttachment