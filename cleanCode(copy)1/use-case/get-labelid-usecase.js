function makegetLabelId({ Joi, getLabelId }) {
    return async function labelId({userId,label }) {
      try {
        let value = validateInput({userId,label })
  
        let resultData = await getLabelId({userId,label })
        console.log(resultData, "result");
  
        return resultData;
      }
      catch (error) {
        console.log(error, "error");
        throw new Error(error);
      }
    }

    function validateInput(input){
        const schema = Joi.object({
            userId:Joi.string().required(),
            label:Joi.string().allow(""),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }
    }
  
  module.exports = makegetLabelId;