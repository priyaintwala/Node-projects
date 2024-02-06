

function makegetUserFromExpiresUsecase({Joi,getUserfromExpiresDataAccess}){
    return async function getUserFromExpiresUsecase({currentTime}){
        try {
         console.log("getUserfromExpiresUsecase currentTime",currentTime);
         validation({ currentTime });
         let result = await getUserfromExpiresDataAccess({currentTime});
         return result;

        } catch (error) {
            console.log(error,"use");
        }
     
    
        function validation(input){
            const schema=Joi.object({
              currentTime:Joi.date()
            });
            const {error,value}= schema.validate(input);
            if (error) {
                throw new Error(error.details[0].message);
            }
            return value;
        }
    }
}

module.exports=makegetUserFromExpiresUsecase