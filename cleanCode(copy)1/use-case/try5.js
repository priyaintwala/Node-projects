function senEmailWithApi({ fs, path, nodefetch, getUserData }) {
    return async function mail({
      userId,
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      filePath,
      fileName
    }) {
      console.log({
        userId,
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        filePath,
        fileName
      });
      validateInput({
        to,
        from,
        cc,
        bcc,
        subject,
        text,
        html,
        fileName,
        filePath,
        userId
      });
      let { data } = await getUserData({ id: userId });
      console.log(data, userId, " ++++++++++++++");
  
      let accessToken = data[0].access_token;
  
      const boundary = "myboundary";
  
      let cid = [];
      let alt = [];
      let msg = [];
  
      const headers = new nodefetch.Headers({
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
  
      const msgData = JSON.stringify({
        raw: encodedMessage,
      });
  
      let sendData = await nodefetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers,
          body: msgData,
        }
      );
      sendData = await sendData.json();
      console.log(sendData);
    };
    function validateInput({
      to,
      from,
      cc,
      bcc,
      subject,
      text,
      html,
      fileName,
      filePath,
      userId
    }) {
      console.log("email send usecase");
  
      let schema = Joi.object({
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
  
      let { value, error } = schema.validate({
        to,
        from,
        cc,
        bcc,
        subject,
        text,
        html,
        fileName,
        filePath,
        userId
      });
      if (error) {
        throw error.details[0].message;
      }
  
      return value;
    }
  };
  
  module.exports = senEmailWithApi;
  
  // {
  //     "to":"greenhousedk02@gmail.com",
  //     "from":"lostpenner@gmail.com",
  //     "subject":"Hello from postman",
  //     "text":"Postmainnnnnnnnnnnnnnnnnnnnnnn",
  //     "html":"<h1>Hello World</h1><img src='cid:qwertyujhgfd' alt='screenshot1'>",
  //     "fileName":"screenshot1, screenshot2",
  //     "filePath":"/home/ad.rapidops.com/shruti.lad/Pictures/Screenshot from 2023-03-20 14-52-38.png,/home/ad.rapidops.com/shruti.lad/Desktop/GIT_Task/Shruti-Lad/Email Client/Flow Diagram/Activity Diagram.png"
  // }