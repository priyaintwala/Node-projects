
function makeIdExistedUsecase({getuserByIdDataAccess,Joi}){
    return async function idExistedUsecase({id}){
        console.log("idexistedcheck");
        validation({id});

        const result = await getuserByIdDataAccess({id});
        console.log("result for id check",result);
        if(result.length === 0){
            return false;
        }
        return true;
    }

    function validation(input){
        const schema = Joi.object({
            id:Joi.number().required()
        })
        const {error}=schema.validate(input)
        if(error) throw error
    }
}

module.exports=makeIdExistedUsecase