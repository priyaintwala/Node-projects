function deleteUserUsecase({deleteuserByIdDataAccess,Joi,redis}){
    return async function getdeleteUserUsecase({id}){
        validation({id});

        // let exist = await idExistedUsecase({id})
        // existederror(exist)
        
        let a =await deleteuserByIdDataAccess({id}) 

        const delredisdata = await redis();
        console.log(delredisdata,"redis data of del in delete usecase");
        
        return a;
    }
    function validation(input){
        const schema = Joi.object({
            id : Joi.number().required().unsafe(),
        });
        const {error}= schema.validate(input);
        if(error)  throw (error.details[0].message);
    }
    function existederror(input){
        if(input==false){
            throw ("id not existed");
        }
    }
}

module.exports=deleteUserUsecase