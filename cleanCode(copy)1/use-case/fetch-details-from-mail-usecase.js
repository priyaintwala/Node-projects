function makefetchDetailsFromMailUsecase({Joi}) {
    return  function fetchDetailsFromMail(emails) { 
           console.log("emails.id-msgid in fetchemail usecase");
           console.log(emails);
            const msgid = emails.id; 
            const threadid = emails.threadId; 
        
            let bodyPreview = emails.snippet, globalId, subject, createdAt, htmlBody, textBody, reference, inReplyTo; 
            let headers = emails.payload.headers; 
            headers.forEach((element) => { 
                if (element.name == "Subject") { subject = element.value; }
                 if (element.name == "Date") { createdAt = element.value; }
                  if (element.name == "Message-ID") { globalId = element.value; } 
                  if (element.name == "Reply-To" || element.name == "In-Reply-To") { inReplyTo = element.value; }
                   if (element.name == "References") { reference = element.value; } 
                }) 
                let type = emails.payload.mimeType; 
                let obj = emails.payload; 
                if (type == "text/html") { 
                    const a = obj.body.data; 
                    htmlBody = Buffer.from(a, 'base64').toString('utf-8'); 
                } else if (type == "text/plain") {
                    const a = obj.body.data; 
                    textBody = Buffer.from(a, 'base64').toString('utf-8'); 
                } else if (type == "multipart/alternative") {
                    const a = obj.parts[0].body.data; 
                    textBody = Buffer.from(a, 'base64').toString('utf-8');
                    const b = obj.parts[1].body.data; 
                    htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
                } else {
                    while (type != "multipart/alternative") {
                        // console.log(obj.parts,"this is only obj.partsss");
                        // console.log(obj.parts[0],"this is parts[0] ");
                        console.log(obj,"obj in fetch details for parts error");
                        obj = obj.parts[0]; 
                        type = obj.mimeType; 
                        if (type == "text/html") { 
                            const a = obj.body.data; htmlBody = Buffer.from(a, 'base64').toString('utf-8');
                            // const textBody = null 
                            } else if (type == "text/plain") {
                            const a = obj.body.data; textBody = Buffer.from(a, 'base64').toString('utf-8');
                            // const htmlBody = null 
                            } else if (type == "multipart/alternative") { 
                            const a = obj.parts[0].body.data; textBody = Buffer.from(a, 'base64').toString('utf-8'); 
                            const b = obj.parts[1].body.data; htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
                            }
                        } 
                    } return Object.freeze({
                        msgid, 
                        threadid, 
                        globalId, 
                        subject, 
                        createdAt, 
                        htmlBody, 
                        textBody, 
                        reference, 
                        inReplyTo, 
                        bodyPreview 
                        }); 
                    }

                    function validateInput(input){
                        const schema = Joi.object({
                            userId:Joi.string().required(),
                            label:Joi.string().allow(""),
                        });
                        const {error,value}= schema.validate(input);
                        if(error)  {throw (error.details[0].message);
                        }
                        return value;
                    }
        
      }
     
   
  
    
  
  module.exports = makefetchDetailsFromMailUsecase;