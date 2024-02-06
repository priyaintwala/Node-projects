function makedeleteUserController({Joi,deleteUserUsecase}){
   
        return  deleteUserController=async (req,res)=>{
            try {
                validation(req.params);
                let {id} = req.params;
                console.log(id);
                 await deleteUserUsecase({id});
                 res.status(200).json("user deleted")
                //  res.send(user)
            } catch (error) {
                res.status(403).send(error.details[0].message);    
            }
        }
        function validation(input){
            const schema=Joi.object({
                id: Joi.number().required().unsafe()
            })
            const {error} = schema.validate(input);
            if(error) throw error;
        }
    }
    
    module.exports=makedeleteUserController
