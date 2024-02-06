function makeUpdateLabelController({Joi,updateLabel}){
    return updateLabelController = async (req,res)=>{
        console.log("helooooo");
        try {
            console.log("jiiiiii");
            console.log(req.body,"asdfghjk");
            validation(req.body)
            console.log("im out");
            const {labelName,userId}= req.body;
               console.log(updateLabel);
            await updateLabel({labelName,userId})
            console.log("waiting");
            
            res.status(200).json("Label Updated")
            
        } catch (error) {
            res.status(403).send(error);    
        }
       
    }
    function validation(input){
        const schema=Joi.object({
            labelName:Joi.string().trim().required(),
            userId:Joi.string().required(),
        })
        const {error} = schema.validate(input);
        if(error) throw error;
    }
}

module.exports=makeUpdateLabelController