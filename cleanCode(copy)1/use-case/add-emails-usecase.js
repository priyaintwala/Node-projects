function  makeAddEmails({Joi,emailEntities,insertEmails}){
    return async function addEmails({
        messageId, globalMessageId,subject,
        snippet,userId, threadId,
        htmlBody, textBody, inReplyBody,
        reference,createdAt,
    }){
        try {
            console.log("in usecase add emails",{
                messageId, globalMessageId,subject,
                snippet,userId, threadId,
                htmlBody,textBody,inReplyBody,
                reference, createdAt});

            validation({
             messageId, globalMessageId,subject,
             snippet,userId, threadId,
             htmlBody,textBody,inReplyBody,
             reference, createdAt}) 

           console.log("after validation in add emails usecase", {messageId, globalMessageId,subject,
           snippet,userId, threadId,
           htmlBody,textBody,inReplyBody,
           reference, createdAt});
           
             const emailEntity = emailEntities({
                 messageId, 
                 globalMessageId,subject,
                 snippet,userId, threadId,
                 htmlBody,textBody,inReplyBody,
                 reference, createdAt})
              console.log("\n\n\n",emailEntity,"\n\n\n==========================================================================");
     
              let result = await insertEmails({
                 messageId:emailEntity.messageId,
                 globalMessageId:emailEntity.globalMessageId,
                 subject:emailEntity.subject,
                 snippet:emailEntity.snippet,
                 userId:emailEntity.userId,
                 threadId:emailEntity.threadId,
                 htmlBody:emailEntity.htmlBody,
                 textBody:emailEntity.textBody,
                 inReplyBody:emailEntity.inReplyBody,
                 reference:emailEntity.reference,
                 createdAt:emailEntity.createdAt,
              })
             console.log("after adding data in dataaccess in email usecase ");
              return result;
        } catch (error) {
            console.log(error,"error message in email usecase");
        }
      
    }

   function validation(input){
    const schema=Joi.object({
        messageId:Joi.string(),
        globalMessageId:Joi.string(),
        subject:Joi.string(),
        snippet:Joi.string(),
        userId:Joi.string(),
        threadId:Joi.string(),
        htmlBody:Joi.string(),
        textBody:Joi.string(),
        inReplyBody:Joi.string(),
        reference:Joi.string(),
        createdAt:Joi.date()
    })
    const {error}= schema.validate(input);
      if (error) throw (error);
  }

}

module.exports=makeAddEmails;