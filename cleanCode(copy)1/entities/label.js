module.exports=function makeuserTable({Joi}){
    return function labelTable({
      id,labelName,providersId,priority
    }){
    const schema=Joi.object({
        id:Joi.string(),
        labelName:Joi.string(),
        providersId:Joi.string(),
        priority:Joi.number().integer(),
    });

    const {value,error}= schema.validate({
        id,labelName,providersId,priority
    });
    if (error) {
        throw (error.message);
      }

    return Object.freeze({
        id:value.id,
        labelName:value.labelName,
        providersId:value.providersId,
        priority:value.priority,
    })  
    }
}