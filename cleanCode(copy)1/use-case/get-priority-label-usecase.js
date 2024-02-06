function makegetPriorityLabel({ Joi, getPriorityLabel }) {
    return async function peioritylabel({userId}) {
      try {
        let value = validateInput({userId })
  

        let resultData = await getPriorityLabel({userId })
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
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }
  
    }
  
  module.exports = makegetPriorityLabel;