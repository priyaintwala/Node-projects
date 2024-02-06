function updateGmailLabels({Joi,updateLabelData}){
    return async function labels({userId,updateData,label}) {
        console.log("updated usecase",updateData);
        // validateInput({userId,updateData,label})
        let result = await updateLabelData({userId,updateData,label})
    }
function validateInput(input){ 
    let schema = Joi.object({ 
    userId:Joi.string(),
    updateData: Joi.string(), 
    label: Joi.string()
 }); 
    let { value, error } = schema.validate(input); 
    if (error) { 
        throw new Error(error.details[0].message);
     } return value; 
    } 
}

module.exports=updateGmailLabels