
const config = require('../config/development')
const {Pool} = require('pg')


const cockroach = new Pool({ 
    user: config.development.username, 
    host: config.development.host, 
    database: config.development.database, 
    password: config.development.password, 
    port: config.development.port, 
    ssl: config.development.dialectOptions.ssl
});

async function insertEmails({ 
    messageId,
        globalMessageId,
        subject,
        snippet,
        userId,
        threadId,
        htmlBody,
        textBody,
        inReplyBody,
        reference,
        createdAt,
}) 
      {
      console.log("before query exceution in database of email :::: ms id=", messageId);
       const user = await cockroach.query("INSERT INTO emails (message_id,global_message_id,subject,snippet,user_id,thread_id,html_body,text_body,in_reply_body,reference,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) Returning message_id",
          [ messageId,
            globalMessageId,
            subject,
            snippet,
            userId,
            threadId,
            htmlBody,
            textBody,
            inReplyBody,
            reference,
            createdAt])
      // const user = await cockroach.query("INSERT INTO emails (message_id,global_message_id,subject,snippet,user_id,thread_id,html_body,text_body,in_reply_body,reference,created_at) VALUES (${messageId},$globalMessageId,$subject,$snippet,'$userId',$threadId,$htmlBody,$textBody,$inReplyBody,$reference,$createdAt) Returning message_id")
       console.log("after query execution in email database ");
        return user.rows[0].id;  
      }


async function getEmailData({messageId}){
    console.log("dataaccsess in emailDb message id",messageId);
    let result = await cockroach.query(`SELECT * FROM emails WHERE message_id=$1`,[messageId]);
    // console.log(result.rowCount);
    return result;
}

module.exports={
    insertEmails,
    getEmailData
}