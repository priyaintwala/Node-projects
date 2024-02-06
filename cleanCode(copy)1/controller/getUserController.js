function makegetUserController({getUserUsecase,Joi}){
    return getUserController= async(req,res)=>{
        try {
            // console.log("usecase",req.body);
            validation(req.body);
            let {offset,limit} = req.body;
            console.log("offset",offset);
            let user = await getUserUsecase({offset,limit});
            res.send(user)
        } catch (error) {
        //res.send(error.message) 
        throw (error);
        }
    }
    function validation(input){
        const schema=Joi.object({
            offset :Joi.number().required().unsafe(),
            limit :Joi.number().required(),
        })
        const {error}= schema.validate(input);
       if (error) throw (error);
    }
}
module.exports=makegetUserController