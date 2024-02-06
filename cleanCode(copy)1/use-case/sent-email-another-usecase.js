

function makesendEmailUsecase({Joi,fs,fetch,path,getUserByIdUsecase}){
    return async function sendEmailUsecase({userId,to,cc,bcc,from,text,html,subject,filePath,fileName}){
        try {
            
            console.log("send email another usecase ",{userId,to,cc,bcc,from,text,html,subject,filePath,fileName});
            validation({userId,to,cc,bcc,from,text,html,subject,filePath,fileName});

            const userdetails = await getUserByIdUsecase({id:userId})
            const accessToken = userdetails.userData.access_token;

            const boundary = "myboundary";

    let cid = [];
    let alt = [];
    let msg = [];

    const headers = new fetch.Headers({
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/mixed",
    });

    if (text) {
      msg.push(
        `--${boundary}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Disposition: inline`,

        "",
        text,
        ""
      );
    }

    if (html) {
      msg.push(
        `--${boundary}`,
        `Content-Type: text/html; charset="UTF-8"`,
        `Content-Disposition: inline`,

        "",
        html,
        ""
      );

      html.split("cid:").map((parts, i) => {
        if (i != 0) {
          cid.push(parts.split(/\"|\'/)[0]);
          alt.push(parts.split(/\"|\'/)[2]);
        }
      });
      console.log(cid, "cid");
      console.log(alt, "alt");
    }
    if (filePath) {
      let paths = filePath.split(",");

      paths.forEach(function (p) {
        // let fileName = path.basename(p);
        const attachment = fs.readFileSync(p);
        const encodedAttachment = attachment.toString("base64");
        let extension = path.extname(p);
        console.log(fileName,"_---")
        if (alt.includes(fileName)) {
          let index = alt.indexOf(fileName);
          console.log(cid[index],":::::::::::::::::::::::::::::::::::");
          msg.push(
            `--${boundary}`,
            `Content-Type: application/${extension}; name=${fileName}`,
            `Content-Disposition: attachment; filename=${fileName}`,
            `Content-Transfer-Encoding: base64`,
            `Content-Id:${cid[index]}`,
            "",
            encodedAttachment,
            ""
          );
        } else {
          msg.push(
            `--${boundary}`,
            `Content-Type: application/${extension}; name=${fileName}`,
            `Content-Disposition: attachment; filename=${fileName}`,
            `Content-Transfer-Encoding: base64`,
            "",
            encodedAttachment,
            ""
          );
        }
      });
    }
    msg.push(`--${boundary}--`);
    msg = msg.join("\r\n");

 

    const encodedMessage = Buffer.from(
      `To: ${to}\r\n` +
        // `Cc: ${message.cc}\r\n` +
        `Subject: ${subject}\r\n` +
        `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n` +
        `${msg}\r\n`
    ).toString("base64");

    const messageData = JSON.stringify({
      raw: encodedMessage,
    });

    let sendData = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers,
        body: messageData,
      }
    );
    sendData = await sendData.json();
    console.log(sendData);
  
   
        
        } catch (error) {
            console.log(error,"use");
        }
     
    
        function validation(input){
            const schema=Joi.object({
              from: Joi.string().email(),
              to: Joi.array().items(Joi.string().email()).required(),
              cc: Joi.array().items(Joi.string().email()),
              bcc: Joi.array().items(Joi.string().email()),
              subject: Joi.string(),
              text: Joi.string(),
              html: Joi.string(),
              fileName: Joi.array().items(Joi.string()),
              filePath: Joi.array().items(Joi.string()),
              userId:Joi.string(),
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
