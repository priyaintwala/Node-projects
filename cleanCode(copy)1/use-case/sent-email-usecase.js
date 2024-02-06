// const { OAuth2Client } = require("google-auth-library");
function makesendEmailUsecase({Joi,nodemailer,getUserByIdUsecase}){
    return async function sendEmailUsecase({userId,to,cc,bcc,from,text,html,subject,filePath,fileName}){
        try {
         console.log("send email usecase ",{userId,to,cc,bcc,from,text,html,subject,filePath,fileName});

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

         validation({userId,to,cc,bcc,from,text,html,subject,filePath,fileName});

         let cid=[];
         let alt=[];

         let x = html.split("cid:").map((parts, i)=>{
          if(i != 0){
            cid.push(parts.split(/\"|\'/)[0]);
            alt.push(parts.split(/\"|\'/)[2]);
          }
         })

         console.log(cid,"cid in sent email usecase");
         console.log(alt,"alt in sent email usecase");

         let attachments =[];
         for(let i=0;i<fileName.length;i++){
            console.log(fileName[i],"for loop filename[i] in sent email usecaxe");
            if(alt.includes(fileName[i])){
              let index = alt.indexOf(fileName[i]);
              console.log(index,"index");
              attachments.push({
                filename: fileName[i],
                path: filePath[i],
                cid: cid[index],
              });
            }else{
              attachments.push({
                filename: fileName[i],
                path: filePath[i],
              }); 
         }
         
         console.log("attachments",attachments);

         const userdetails =  await getUserByIdUsecase({id:userId})
        //  console.log(userdetails.userData.access_token,"u.u.a");

         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type:"OAuth2",
              user: `${userdetails.userData.email_id}`,
              accessToken: `${userdetails.userData.access_token}`,
            },  
          });
          
          // Create an email message
          let mailOptions = {
            from: from,
            to: to,
            bcc:bcc,
            cc:cc,
            subject: subject,
            text: text,
            html: html,
            attachments:attachments,
          };

        //   for(let attach of attachments){
        //     let obj = { 
        //         filename:attach.fileName,
        //         path:attach.filePath,
        //         cid:attach.filename,
        //     }
        //     mailOptions.attachments.push(obj);
        // }
    
          // Send the email
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        }
       } catch (error) {
            console.log(error,"use");
        }
     
    
        function validation(input){
            const schema=Joi.object({
              // to:Joi.string().required(),
              // from:Joi.string().email().required(),
              // cc:Joi.string().email(),
              // bcc:Joi.string().email(),
              // fileName:Joi.string(),
              // filePath:Joi.string(),
              //   subject:Joi.string(),
              //    text:Joi.string(),
              //     html:Joi.string(),
                  userId:Joi.string(),
                 to:Joi.array().items(Joi.string().email()).required(),
                 from:Joi.string().email(),
                 cc:Joi.array().items(Joi.string().email()),
                 bcc:Joi.array().items(Joi.string().email()),
                 subject:Joi.string(),
                 text:Joi.string(),
                 html:Joi.string(),
                 filePath:Joi.array().items(Joi.string()),
                 fileName:Joi.array().items(Joi.string()),
            });
            const {error,value}= schema.validate(input);
            if (error) {
                throw new Error(error.details[0].message);
            }
            return value;
        }
    }
  }

module.exports=makesendEmailUsecase
