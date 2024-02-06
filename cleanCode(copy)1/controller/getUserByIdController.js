function makegetUserByIdController({Joi,getUserByIdUsecase}){
    return async (req,res)=>{
        
       try {
            validation(req.params);
            let {id} = req.params;
            console.log(req.params);
            console.log("in controller usecase");
            let user= await getUserByIdUsecase({id});
             console.log(user);
             res.status(200).json(user)
        } catch (error) {
            res.status(403).send(error);    
        }
    }
    function validation(input){
        const schema=Joi.object({
            id:Joi.string().required(),
        })
        const {error} = schema.validate(input);
        if(error) throw (error.details[0].message);
    }
}

module.exports=makegetUserByIdController