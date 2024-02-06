
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

    async function insertAttachmentData({
      messageId,fileName,filePath,fileType,fileSize
         }
    ) {
      console.log("dataaccess attachment data for insert ",messageId,fileName,filePath,fileType,fileSize);
      let result = await cockroach.query(
        "INSERT INTO attachments (message_id,file_name,file_path,file_type,file_size) VALUES ($1,$2,$3,$4,$5) Returning message_id",
        [messageId,fileName,filePath,fileType,fileSize]
      );
      // console.log(result);
      return result;
    }
//     async function getAttachmentData({messageId}) {
//     console.log("msgid in attachment dataaccess",messageId);
//     let result = await cockroach.query(
//       `SELECT * FROM attachments WHERE message_id=$1`,[messageId]);
//     console.log(result);
//     return result.rowCount;
//   }
  
module.exports = {insertAttachmentData};


