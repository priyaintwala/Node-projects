function makeUpdateUserController({updateUserUsecase,Joi}){
    return async function updateUserController(req,res){
         try {
            validation(req.body);
            let {id,userName} = req.body;
            console.log(req.body);
            console.log(updateUserUsecase,"aaaaaaaaaaaaa");
            await updateUserUsecase({id,userName});
            res.status(201).json("updated")
         } catch (error) {
            console.log(error);
            res.status(403).send(error)
         }
    }
    function validation(input){
        const schema = Joi.object({
            id: Joi.string().required(),
            userName: Joi.string().trim().required().min(3)
        })
        const {error}= schema.validate(input);
       if(error)  throw error;
    }
}
module.exports=makeUpdateUserController;