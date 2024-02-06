function makegetUserByIdController({getUserByIdUsecase}){
    return async function getUserByIdController(req,res){
       try {
            let {id} = req.params;
            console.log(req.params);
            console.log("in controller usecase");
            let user= await getUserByIdUsecase({id,res});
           
        } catch (error) {
            res.status(403).send(error);    
        }
    }
}

module.exports=makegetUserByIdController