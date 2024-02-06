
const {getUserByIdUsecase,addEmails}=require('../use-case/index')
const { Kafka } = require('kafkajs')
const nodefetch = require('node-fetch')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test1-group' })
console.log("in consumer");
const run = async () => {
  // Consuming
  console.log("first consumerrrrrrr");
  await consumer.connect()
  await consumer.subscribe({ topic: 'gmail-mails', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({message }) => {

     console.log("in consumer gamil");
      let id=message.value.toString();
      console.log(message.value.toString(),"aaaaaaaaaaaaa");

      const userdetails =  await getUserByIdUsecase({id})
      console.log(userdetails.userData,"userdetails in handler");
      
      let date= new Date(Date.now() - 2592000000);
    //   console.log(date,"date",date.getFullYear(),date.getMonth(),date.getDate(),after: ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`);
        // console.log(userdetails.userData.email_id,"email_id which is undefined");

      let labels = ["IMPORTANT","INBOX","STARRED","SENT","TRASH"]; 
      let emailData = [];

      console.log(labels,"labels array");

      for(let i=0;i<labels.length;i++){
        console.log("loop in email consumer");
        const label = labels[i];
        const labelname = `${label}`;
        const emails = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages?access_token=${userdetails.userData.access_token}&q=in:${labelname} after:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
        const email = await emails.json();
        if(emailData!=undefined){
          emailData.push(email.messages)
        }
        
      }
      console.log("-------------------------------------------------------------------",emailData,"==================================");
      console.log("emailData.length",emailData.length);
      for(let i=0;i<emailData.length;i++){
        for(let j=0;j<emailData[i].length;j++){
          console.log(emailData[i][j].id,"id of messages in consumer");
          const emailbody = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages/${emailData[i][j].id}/?access_token=${userdetails.userData.access_token}`);
          const emails = await emailbody.json();
          console.log(emails,"emails in 2nd fo loop and callingfun");
          let data = fetchDetailsFormMail(emails);
          console.log(data,"fetch data from mail fun executed");
          let result = await addEmails({
                  messageId:data.msgid,
                  userId:id,
                  globalMessageId:data.globalId,
                  threadId:data.threadid,
                  subject:data.subject,
                  createdAt:data.createdAt,
                  htmlBody:data.htmlBody,
                  textBody:data.textBody,
                  snippet:data.bodyPreview,
                  reference:data.reference,
                  inReplyBody:data.inReplyTo,
                  })

                  console.log("addeddddd");

                

        }
      }
    //   let emails = `https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages?access_token=${userdetails.userData.access_token}&q=in:inbox`
    // //   let emails = `https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/labels?access_token=${userdetails.userData.access_token}`

    //   const resultEmails = await nodefetch(emails)
    //   console.log(resultEmails,"resultEmails");

    //   const emails1 = await resultEmails.json()
    //     console.log(emails1,"emails11");

    //   let messages = emails1.messages;
    //   console.log(messages);

    //   console.log(messages[0].id,"messages[0].id");
    //   console.log(messages[0].threadId,"messages[0].threadId");

    //   // let {id,threadId}=messages[0]
     
    //   for (let i of messages){
    //     let {id,threadId}= i
    //     console.log(id,"id");
    //     console.log(threadId,"threadId");

    //     let emailsData = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages/${id}/?access_token=${userdetails.userData.access_token}`);
    //     emailsData=await emailsData.json();
    //     console.log(emailsData);

    //     let headers = emailsData.payload.headers;
    //     console.log(headers,"headerssssssssssss");

    //     headers.forEach(element => {
    //       if(element.name=='Subject'){
    //         subject=element.value
    //       }
    //       if(element.name=='Date'){
    //         createdAt=element.value
    //       }
    //       if(element.name=='Message-ID'){
    //          globalMessageId=element.value
    //       }
    //       if(element.name=='Reply-To'){
    //         inReplyBody = element.value
    //       }
    //       if(element.name=='References'){
    //         reference = element.value
    //       }
    //     });
  
    //     // let partsofEmail = emailsData.payload.parts;
    //     // partsofEmail.forEach((element) => { 
    //     //   if (element.mimeType == "text/plain") {
    //     //      textBody = element.body.data;
    //     //      } 
    //     //   if (element.mimeType == "text/html") { 
    //     //       htmlBody = element.body.data;
    //     //      } 
    //     //   });
    
    //       if (emailsData.payload.body.size == 0) { 
    //         let parts = emailsData.payload.parts; 
    //         parts.forEach((element) => { 
    //           if (element.mimeType == "text/plain") {
    //              textBody = element.body.data; 
    //             } else if (element.mimeType == "text/html") {
    //                htmlBody = element.body.data;
    //                } 
    //               }); 
    //             } else { 
    //               if (emailsData.payload.mimeType == "text/plain") { 
    //                 textBody = emailsData.payload.body.data;
    //                } else if (emailsData.payload.mimeType == "text/html") {
    //                  htmlBody = emailsData.payload.body.data; 
    //                 } 
    //               }

          
    //       let result = await addEmails({
    //       messageId:id,
    //       globalMessageId,
    //       subject,
    //       snippet:emailsData.snippet,
    //       userId:user_id,
    //       threadId,
    //       htmlBody,
    //       textBody,
    //       inReplyBody,
    //       reference,
    //       createdAt,
    //       })
    //   }
          

      

     
      
    },
  })
}

run().catch(console.error)


function fetchDetailsFormMail(emails) {
  const msgid = emails.id;
  const threadid = emails.threadId;
  let bodyPreview = emails.snippet, globalId, subject, createdAt, htmlBody, textBody, reference, inReplyTo;
  let headers = emails.payload.headers;

  headers.forEach((element) => {
    if (element.name == "Subject") { subject = element.value; }
    if (element.name == "Date") { createdAt = element.value; }
    if (element.name == "Message-ID") { globalId = element.value; }
    if (element.name == "Reply-To" || element.name == "In-Reply-To") { inReplyTo = element.value; }
    if (element.name == "References") { reference = element.value; }
  })

  console.log(subject);

  let type = emails.payload.mimeType;
  let obj = emails.payload;

  if(type=="text/html"){
    const a = obj.body.data;
    const htmlBody = Buffer.from(a, 'base64').toString('utf-8');
    const textBody = null
  }
  else if(type=="text/plain"){
    const a = obj.body.data;
    const textBody = Buffer.from(a, 'base64').toString('utf-8');
    const htmlBody = null
  }
  else if(type=="multipart/alternative"){
     const a = obj.parts[0].body.data;
     textBody = Buffer.from(a, 'base64').toString('utf-8');
     const b = obj.parts[1].body.data;
     htmlBody = Buffer.from(b, 'base64').toString('utf-8');
  }
  else{
    while(type!="multipart/alternative"){
      obj = obj.parts[0];
      type = obj.mimeType;
      if(type=="text/html"){
        const a = obj.body.data;
        const htmlBody = Buffer.from(a, 'base64').toString('utf-8');
        const textBody = null
      }
      else if(type=="text/plain"){
        const a = obj.body.data;
        const textBody = Buffer.from(a, 'base64').toString('utf-8');
        const htmlBody = null
      }
      else if(type=="multipart/alternative"){
        const a = obj.parts[0].body.data;
        textBody = Buffer.from(a, 'base64').toString('utf-8');
        const b = obj.parts[1].body.data;
        htmlBody = Buffer.from(b, 'base64').toString('utf-8');
      }
 }
}

  return Object.freeze({
    msgid,
    threadid,
    globalId, 
    subject, 
    createdAt, 
    htmlBody, 
    textBody, 
    reference, 
    inReplyTo,
    bodyPreview
  });

}

// function fetchDetailFromMail(emails) { 
//   const msgid = emails.id;
//   const threadid = emails.threadId; 
//   let bodyPreview = emails.snippet;
//   let  globalId, subject, createdAt,htmlBody, textBody, reference, inReplyBody; 
//   let headers = emails.payload.headers; 
//   headers.forEach((element) => { 
//     if (element.name == "Subject") { subject = element.value; }
//     if (element.name == "Date") { createdAt = element.value; } 
//     if (element.name == "Message-ID") { globalMessageId = element.value; } 
//     if (element.name == "Reply-To" || element.name == "In-Reply-To") { inReplyBody = element.value; } 
//     if (element.name == "References") { reference = element.value; }
//    })
//   console.log(subject,"subjectsdfghjkl"); 
//   let type = emails.payload.mimeType; 
//   let obj = emails.payload; 


//    if(type=="text/html"){
//        const a = obj.body.data;
//        const htmlBody = Buffer.from(a, 'base64').toString('utf-8');
//        const textBody = null
//      }
//      else if(type=="text/plain"){
//         const a = obj.body.data;
//         const textBody = Buffer.from(a, 'base64').toString('utf-8');
//         const htmlBody = null
//    }

//  else if(type=="multipart/alternative"){ 
//     const a = obj.parts[0].body.data; 
//     textBody = Buffer.from(a, 'base64').toString('utf-8'); 
//     const b = obj.parts[1].body.data; 
//     htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
//   } else{ 
//     while(type!="multipart/alternative"){
//       obj = obj[0].parts; 
//       type = obj.mimeType;
//       console.log(obj,"obj partssdfghjkl");
//       // console.log(obj.parts.mimeType,"obj . type . mimetypeee");
     
//       console.log(type,"this is the type ijbvzaertyul;");

//       if(obj.parts==undefined){
//         if(type=="text/html"){
//           const a = obj.body.data;
          
//           const htmlBody = Buffer.from(a, 'base64').toString('utf-8');
//           console.log(htmlBody,"text/html in whileee");
//           const textBody = null
//         }
//         else if(type=="text/plain"){
//            const a = obj.body.data;
//            const textBody = Buffer.from(a, 'base64').toString('utf-8');
//            console.log(htmlBody,"text/plain in whileee");
//            const htmlBody = null
//        }
//        type = obj[0].mimeType; 
//       } 
//       else{
        
//       if(type=="multipart/alternative"){ 
//         const a = obj.parts[0].body.data; 
//         textBody = Buffer.from(a, 'base64').toString('utf-8'); 
//         const b = obj.parts[1].body.data; 
//         htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
//       } 
//     }
//     } 
//   } 
//   return Object.freeze({ 
//     msgid, 
//     threadid, 
//     globalId, 
//     subject, 
//     createdAt, 
//     htmlBody, 
//     textBody, 
//     reference, 
//     inReplyBody, 
//     bodyPreview 
//   });
//  } 
