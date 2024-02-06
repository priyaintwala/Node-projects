const {getUserByIdUsecase,addEmails,updateGmailLabels,emailFolderAssociation,emailReceipient,emailAttachment,LabelId,PriorityLabel}= require('../use-case/index')
// const {getPriorityLabel,getLabelId}= require('../data-access/index')

const {Kafka}= require('kafkajs')
const nodefetch = require('node-fetch')
const fs = require('fs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'new-mail-group' });
const run = async () =>{
    
await consumer.connect()
await consumer.subscribe({ topic: 'gmail-mails', fromBeginning: true });

await consumer.run({
    eachMessage: async ({topic,partition,message})=>{
        try {
            let {id,labelName,pageToken} = JSON.parse(message.value.toString()); 

            const userdetails =  await getUserByIdUsecase({id})
            const date = new Date(Date.now() - 2592000000);

              //for date  after:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
              const emails = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/messages?access_token=${userdetails.userData.access_token}&q=in:${labelName}&pageToken=${pageToken} `);
              const email = await emails.json();
              pageToken=email.nextPageToken;
               
            //   let {rowCount}=await getEmailData({messageId:id});
            //   console.log(rowCount,"------");
            //   if(rowCount>0){

            //   }
      
              //inserting mail into database
    
              if (email.messages != undefined) { 
                for (let i of email.messages) { 
                    const emailData = await nodefetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${i.id}?access_token=${userdetails.userData.access_token}`);
                    const emails = await emailData.json(); 
                    let data = fetchDetailsFromMail(emails); 
                    await addEmails({ 
                        messageId: data.msgid, 
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
                        let affectedRows = await emailFolderAssociation({labelId,messageId:data.msgid})
                      }
                    
                    const recipients = getrecipient(emails);
                    for(let a of recipients){
                    await emailReceipient({
                        messageId:data.msgid,
                        emailAddress:a.emailadd,
                        typeOf:a.typeof
                    })
                 }

                 let attachmentData = await getattachment(emails);
                 if(attachmentData.length!=0){
                    for(let attach of attachmentData){
                    
                        await emailAttachment({
                            filePath:attach.path,
                            fileName:attach.name,
                            fileSize:attach.size,
                            fileType:attach.type,
                            messageId:data.msgid
                        });           
                     }
                  }
                 } 
                }
                if(pageToken){
                    console.log("the next page token",{next_page_token:pageToken});
                    await updateGmailLabels({userId:id,updateData:{next_page_token:pageToken},label:labelName})
                    const producer = kafka.producer();
                        await producer.connect()
                        await producer.send({ 
                             topic: "gmail-mails", 
                             messages: [{ value: JSON.stringify({id, pageToken, labelName:"IMPORTANT"}) }], });
                }
                else{
                    await updateGmailLabels({userId:id,updateData:{fetch_status:true,next_page_token:pageToken},label:labelName})
                    let result = await PriorityLabel({userId:id})
                    console.log(result);
                    if(result[0]){
                        const producer = kafka.producer();
                        await producer.connect()
                        await producer.send({ 
                             topic: "gmail-mails", 
                             messages: [{ value: JSON.stringify({id, pageToken:"", labelName:result[0].label_name}) }], });
                        return true;
                    }
                }  
        } catch (error) {
            console.log(error,"error in handlwer")
        }
    }
})
}
run(consumer).catch(console.error)


// Getting the data from email 
function fetchDetailsFromMail(emails) { 
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
        let type = emails.payload.mimeType; 
        let obj = emails.payload; 
        if (type == "text/html") { 
            const a = obj.body.data; 
            htmlBody = Buffer.from(a, 'base64').toString('utf-8'); 
        } else if (type == "text/plain") {
            const a = obj.body.data; 
            textBody = Buffer.from(a, 'base64').toString('utf-8'); 
        } else if (type == "multipart/alternative") {
            const a = obj.parts[0].body.data; 
            textBody = Buffer.from(a, 'base64').toString('utf-8');
            const b = obj.parts[1].body.data; 
            htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
        } else {
            while (type != "multipart/alternative") {
                // console.log(obj.parts,"this is only obj.partsss");
                // console.log(obj.parts[0],"this is parts[0] ");
                console.log(obj,"obj in fetch details for parts error");
                obj = obj.parts[0]; 
                type = obj.mimeType; 
                if (type == "text/html") { 
                    const a = obj.body.data; htmlBody = Buffer.from(a, 'base64').toString('utf-8');
                    // const textBody = null 
                    } else if (type == "text/plain") {
                    const a = obj.body.data; textBody = Buffer.from(a, 'base64').toString('utf-8');
                    // const htmlBody = null 
                    } else if (type == "multipart/alternative") { 
                    const a = obj.parts[0].body.data; textBody = Buffer.from(a, 'base64').toString('utf-8'); 
                    const b = obj.parts[1].body.data; htmlBody = Buffer.from(b, 'base64').toString('utf-8'); 
                    }
                } 
            } return Object.freeze({
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

//getting recipient data from emails
            function getrecipient(emails){
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

//getting attachment data
async function getattachment(emails) {
    let msgId = emails.id
    let type = emails.payload.mimeType;
    let obj = emails.payload;
    let attachmentobj = [];
  
    if (type != "text/plain" && type != "text/html" && type != "multipart/alternative") {
       
        if (type = "multipart/mixed") {
            obj = obj.parts;
            for (let i = 1; i < obj.length; i++) {
                let attach = await getDataofAttachment(obj[i],msgId);
                attachmentobj.push(attach);
  
            }
            type = obj[0].mimeType;
            if (type = "multipart/related") {
                for (let i = 1; i < obj.length; i++) {
                    let attach = await getDataofAttachment(obj[i],msgId);
                    attachmentobj.push(attach);
                }
            }
        }
        else {
            obj = obj.parts;
            for (let i = 1; i < obj.length; i++) {
                let attach = await getDataofAttachment(obj.parts[i],msgId);
                attachmentobj.push(attach);
            }
        }
    }
    console.log(attachmentobj);
    return attachmentobj;
  }

  
   //adding the info of the attechment
  async  function getDataofAttachment(data,msgid) {
    let attechmentDataPath = '/home/ad.rapidops.com/priya.intwala/Desktop/emailAttachmentFolder';
    let path, name, size, type;
    let filename=data.mimeType
    filedata = filename.split('/');
    type = filedata[filedata.length-1];
    name = data.filename;
    size = data.body.size;
    path = attechmentDataPath+msgid+name;
    let attachmentData = data.body.attachmentId;
   
    attachmentData = attachmentData.replace(/-/g, "+");
    attachmentData = attachmentData.replace(/_/g, "/");
  
    const textstr = Buffer.from(attachmentData, 'base64').toString('binary');
    await  fs.writeFileSync(path, textstr, 'binary');
  
    return Object.freeze({
        name,
        size,
        path,
        type
    })
  }
