function makeDeleteLabelController({Joi,deleteLabelUsecase}){
    return deleteLabelController= async(req,res)=>{
        try {
            console.log("inside delete label usecase");
            validation(req.body)
            const {labelName,userId}= req.body;
            console.log("req.body in controllerr",req.body)
            // console.log(deleteLabelUsecase(userId),"delete label usecaese");
            await deleteLabelUsecase({labelName,userId})
            
            res.status(200).json("label deleted")
            
        } catch (error) {
            res.status(403).send(error);    
        }
       
    }
    function validation(input){
        const schema=Joi.object({
            labelName:Joi.string().trim().required(),
            userId:Joi.number().required().unsafe()
        })
        const {error} = schema.validate(input);
        if(error) throw error;
    }
}

module.exports=makeDeleteLabelController