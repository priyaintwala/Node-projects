module.exports=function makeuserTable({Joi}){
    return function userTable({
      id,
      fname,
      emailId,
      accessToken,refreshToken,expiresIn
    }){
    const schema=Joi.object({
        id:Joi.string(),
        fname :Joi.string().trim().max(15).min(3),
        emailId:Joi.string().email().trim(),
        accessToken:Joi.string(),
        refreshToken:Joi.string(),
        expiresIn:Joi.number(),
    });

    const {value,error}= schema.validate({
        id,fname,emailId,accessToken,refreshToken,expiresIn
    });
    if (error) {
        throw (error.message);
      }

    return Object.freeze({
        // getId:()=>value.id,
        // getfname: ()=>value.fname,
        // getemailId: ()=>value.emailId,
        id:value.id,
        fname:value.fname,
        emailId:value.emailId,
        accessToken:value.accessToken,
        refreshToken:value.refreshToken,
        expiresIn:value.expiresIn,
    })  
    }
}