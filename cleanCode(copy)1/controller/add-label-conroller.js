function makeaddLabelController({Joi,addLabel}){
    return async function addLabelController(req,res){
        try {
            const ids =JSON.stringify(req.body.id);

            validation({id:ids,labelName:req.body.labelName});
            console.log("out of validiation");
            const {id,labelName} = req.body;
            let result = await addLabel({id,labelName})
            res.send(result);


        } catch (error) {
            console.log("............erroe...............");
            console.log(error.message);
            res.status(409).send(error.message);
        }
    }
    function validation(input){
       const schema=Joi.object({
        id:Joi.string(),
        labelName:Joi.string(),
        priority:Joi.number().integer(),
        
       })
       const {error} = schema.validate(input);
       if (error) throw error;
    }
   
    
}
module.exports=makeaddLabelController