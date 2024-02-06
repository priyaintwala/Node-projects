function makedeleteLabelUsecase({deleteLabels,Joi}){
    return async function deleteLabelUsecase({labelName,userId}){
        // console.log("delete usecase in label");
         validation({labelName,userId});

        let deletelabel= await deleteLabels({labelName,userId})
        // console.log("delete label ",deletelabel);
        return deletelabel; 
    }

    function validation(input){
        const schema = Joi.object({
            userId:Joi.number().required().unsafe(),
            labelName:Joi.string().required(),
        })
        const {error} = schema.validate(input)
        if(error) throw error
    }
}

module.exports=makedeleteLabelUsecase