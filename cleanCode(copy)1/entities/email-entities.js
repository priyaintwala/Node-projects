module.exports=function makeEmailTable({Joi}){
    return function emailTable({
        messageId,
        globalMessageId,
        subject,
        snippet,
        userId,
        threadId,
        htmlBody,
        textBody,
        inReplyBody,
        reference,
        createdAt,
    }){
        console.log("MSG ID:::", messageId)
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

    const {value,error}= schema.validate({
        messageId,
        globalMessageId,
        subject,
        snippet,
        userId,
        threadId,
        htmlBody,
        textBody,
        inReplyBody,
        reference,
        createdAt,
    });
    if (error) {
        throw (error.message);
      }

    return Object.freeze({
        messageId:value.messageId,
        globalMessageId:value.globalMessageId,
        subject:value.subject,
        snippet:value.snippet,
        userId:value.userId,
        threadId:value.threadId,
        htmlBody:value.htmlBody,
        textBody:value.textBody,
        inReplyBody:value.inReplyBody,
        reference:value.reference,
        createdAt:value.createdAt,
    })  
    }
}