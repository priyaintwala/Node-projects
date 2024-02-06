const nodefetch = require('node-fetch')

function makeaddEmailData({getUserByIdUsecase ,fetchDetailsFromMail,addEmails,updateGmailLabels,emailFolderAssociation,emailReceipient,emailAttachment,LabelId,PriorityLabel,getRecipient,getAttachment,getEmailData}){
    return async function addEmailData({id,pageToken,labelName}){
      
           try {
            console.log(id,pageToken,labelName,"log in consumer usecase for pagetoken labelname and id");
            const userdetails =  await getUserByIdUsecase({id})

              const emails = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages?access_token=${userdetails.userData.access_token}&q=in:${labelName}&pageToken=${pageToken} `);
              const email = await emails.json();
            
              console.log("email in consumer usecase",email);

              if (email.messages != undefined) { 
                for (let i of email.messages) { 
                    const emailData = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${i.id}?access_token=${userdetails.userData.access_token}`);
                    const emails = await emailData.json(); 
                    console.log(emails,"emailsssssssssssssssss in consumer");
                    let data = fetchDetailsFromMail(emails); 
                      console.log("data.msgid only data",data);
                      console.log(data.globalId,data.subject,data.createdAt,"data.globalId,data.subject,data.createdAt");
                    const emailmsgid = await getEmailData({messageId:emails.id})
                     

                    try {
                      if(emailmsgid.rows.length==0){
                        await addEmails({ 
                          messageId: emails.id, 
                          userId: userdetails.userData.id, 
                          globalMessageId: data.globalId, 
                          threadId: data.threadid, 
                          subject: data.subject, 
                          createdAt: data.createdAt, 
                          htmlBody: data.htmlBody, 
                          textBody: data.textBody, 
                           snippet: data.bodyPreview, 
                          reference: data.reference, 
                          inReplyBody: data.inReplyTo 
                        });
                  
                  let allLabels= emails.labelIds;
                  for (let j of allLabels) {
                      let result = await LabelId({userId:userdetails.userData.id, label:j});
                      let labelId= result[0].id;
                      console.log(result,"=======this is the result of labelid for assocation")
                      console.log("$$$$$$$",emails.id)
                      let affectedRows = await emailFolderAssociation({labelId,messageId:emails.id})
                    }
                  
                  const recipients = getRecipient(emails);
                  console.log(recipients,"recipientss in consumer usecaseseeee");
                  for(let a of recipients){
                  await emailReceipient({
                      messageId:emails.id,
                      emailAddress:a.emailadd,
                      typeOf:a.typeof
                  })
               }
                
               console.log("ecipients dataaa");
               let attachmentData = await getAttachment(emails);
               console.log("attachmnet",attachmentData);
               if(attachmentData.length!=0){
                  for(let attach of attachmentData){
                    console.log("in loop attachments in consumer usecase",attach);
                      await emailAttachment({
                          filePath:attach.path,
                          fileName:attach.name,
                          fileSize:attach.size,
                          fileType:attach.type,
                          messageId:emails.id
                      });           
                   }
                }
          
                let obj = {
                  label:labelName,
                  userData:userdetails.userData,
                  pageToken:email.nextPageToken
                }
          
                return obj;
                      }
                    } catch (error) {
                      console.log(error,"error");
                    }
          } 
    }
           } catch (error) {
               console.log(error);
           }
         
}
}

module.exports=makeaddEmailData