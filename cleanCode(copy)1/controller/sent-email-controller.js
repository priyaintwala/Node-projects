
function makesendEmailController({Joi,sendEmailUsecase,sentEmailanotherUsecase}){
    return async function sendEmailController(req,res){
        try {
          let {to,cc,bcc,from,text,html,subject,filePath,fileName} = req.body ;
          console.log(req.body,"req.body ");
          
          let userId = req.params.id;
          console.log(req.params.id,'params');
       

          to=to.split(",");
          if(cc){
            cc=cc.split(",");
          }
          if(bcc){
          bcc=bcc.split(",");
          }
          if(fileName){
          fileName=fileName.split(",");
          }
          if(filePath){
          filePath=filePath.split(",");
          }

          let valid=validateInput({userId,to,cc,bcc,from,text,html,subject,filePath,fileName} );
          
          to=valid.to.join(",");
        if(cc){
            cc=valid.cc.join(",");
        }
        if(bcc){
            bcc=valid.bcc.join(",");
        }
        if(fileName){
            fileName=valid.fileName.join(",");
        }
        if(filePath){
            filePath=valid.filePath.join(",");
        }
         
          subject=valid.subject;
        text=valid.text;
        html=valid.html;
        
         
  
          let result= await sendEmailUsecase({userId,to,cc,bcc,from,text,html,subject,filePath,fileName}) ; 

        //   let result1= await sentEmailanotherUsecase({userId,to,cc,bcc,from,text,html,subject,filePath,fileName}) ;
          
        console.log('.....................................................');
        console.log(result,"result in send email controller");
        // console.log(result1,"result in send email controller");

           res.status(201).json({
                status : 'success ',
                msg : 'email sent',
            })
        } catch (error) {
            console.log(error,"in send email contrller error-=-=-=-=-=");
            res.status(400).send(error.message);
        }
    }

    function validateInput(input){
        const schema= Joi.object({
       
        // to:Joi.string().required(),
        // from:Joi.string().email().required(),
        // cc:Joi.string().email(),
        // bcc:Joi.string().email(),
        // fileName:Joi.string(),
        // filePath:Joi.string(),
        // subject:Joi.string(),
        // text:Joi.string(),
        //  html:Joi.string(),
        //  userId:Joi.string(),
       
        to:Joi.array().items(Joi.string().email()).required(),
        from:Joi.string().email().required(),
        cc:Joi.array().items(Joi.string().email()),
        bcc:Joi.array().items(Joi.string().email()),
        subject:Joi.string(),
        text:Joi.string(),
        html:Joi.string(),
        filePath:Joi.array().items(Joi.string()),
        fileName:Joi.array().items(Joi.string()),
        userId:Joi.string(),
        });

        const {error,value}= schema.validate(input);
        if (error) {throw error;}
        return value;
    }
}

module.exports = makesendEmailController
