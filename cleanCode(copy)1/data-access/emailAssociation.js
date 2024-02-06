
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

async function insertEmailFolderAssociationData({
        messageId,labelId
         }
    ) {
      console.log("dataaccess in email association",messageId,labelId);
      let result = await cockroach.query(
        "INSERT INTO email_folder_associations (message_id,label_id) VALUES ($1,$2) returning message_id",
        [messageId,labelId]
      );
      // console.log(result);
      return result;
    }
    async function getEmailFolderAssociationData({messageId}) {
    console.log("dataaccess",messageId);
    let result = await cockroach.query(
      `SELECT * FROM email_folder_associations WHERE message_id=$1`,[messageId]);
    console.log(result);
    return result.rowCount;
  }

  
module.exports = {insertEmailFolderAssociationData,getEmailFolderAssociationData};


