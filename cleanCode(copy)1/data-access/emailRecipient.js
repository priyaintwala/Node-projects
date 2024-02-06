
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

async function insertEmailRecipientData({
        messageId,emailAddress,typeOf
         }
    ) {
      console.log("dataaccess in recipent",messageId,emailAddress,typeOf);
      let result = await cockroach.query(
        "INSERT INTO recipients (message_id,email_address,recipient_type) VALUES ($1,$2,$3) Returning message_id",
        [messageId,emailAddress,typeOf]
      );
      // console.log(result);
      return result;
    }
  //   async function getEmailRecipientData({messageId}) {
  //   console.log("dataaccess in recipient",messageId);
  //   let result = await cockroach.query(
  //     `SELECT * FROM recipients WHERE message_id=$1`,[messageId]);
  //   console.log(result);
  //   return result.rowCount;
  // }

module.exports = {insertEmailRecipientData}


