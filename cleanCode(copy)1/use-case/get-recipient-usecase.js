function makeGetRecipient({Joi}){
    return function getrecipient(emails){

        // validateInput(emails)
        
        let obj = emails.payload.headers;
        let from,to,cc,bcc;
        let recipientobj = [];
        for(let data of obj){
            if(data.name=='From'){
               from = (data.value).split(",").map(data=>[data.split(">")[0]].map((data)=>data.replace(/.*?</,"")).join("")).join(" , ");
               data = {
                typeof: 'From',
                emailadd:from
               }
               recipientobj.push(data);
            }
            if(data.name=='Cc'){
              cc = data.value.split(",").map(data=>[data.split(">")[0]].map((data)=>data.replace(/.*?</,"")).join("")).join(" , ");
              data = {
                typeof: 'Cc',
                emailadd:cc
               }
               recipientobj.push(data);
            }

            if(data.name=='To'){
              to = (data.value).split(",").map(data=>[data.split(">")[0]].map((data)=>data.replace(/.*?</,"")).join("")).join(" , ");
              data = {
                typeof: 'To',
                emailadd:to
               }
               recipientobj.push(data);
            }

            if(data.name=='Bcc'){
              bcc = (data.value).split(",").map(data=>[data.split(">")[0]].map((data)=>data.replace(/.*?</,"")).join("")).join(" , ");
              data = {
                typeof: 'Bcc',
                emailadd:bcc
               }
               recipientobj.push(data);
            }
            
        }
        return recipientobj
      }
      
      function validateInput(input){
        const schema = Joi.object({
            emails:Joi.string(),
        });
        const {error,value}= schema.validate(input);
        if(error)  {throw (error.details[0].message);
        }
        return value;
    }



}
  module.exports = makeGetRecipient;