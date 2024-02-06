function makeUpdateLabelUsecase({updateLabels,Joi,label}){
    return async function updateLabelUsecase({userId,labelName}){
        validation({userId,labelName})
        
        const labelEntity = label({id:userId,labelName})
        console.log("lkkkllll",labelEntity);
        let update =await updateLabels({userId:labelEntity.id,labelName:labelEntity.labelName})
        return update;
    }
  
        function validation(input){
            const schema = Joi.object({
                userId: Joi.string().required(),
                labelName: Joi.string().trim().required().min(3)
            })
           const {error}= schema.validate(input);
           if(error)  throw (error);
        }
}

module.exports=makeUpdateLabelUsecase