function makeUserExistedUsecase({userExistDataAccess,Joi}){
    return async function userExistUsecase({emailId}){
        
        validation({emailId})

        let result = await userExistDataAccess({emailId})
        if(!result[0][0]){
          return false;
        }else{
            return true;
        }
    }
    function validation(input){
        const schema=Joi.object({
            // id:Joi.number().required(),
            emailId:Joi.string().email().trim().required()
        });
        const {error} = schema.validate(input);
        if(error){
            throw error;
        }
    }
}
module.exports=makeUserExistedUsecase;