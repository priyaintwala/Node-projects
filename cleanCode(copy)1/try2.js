const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const sendMessage = () => {
  const accessToken = 'ya29.a0AWY7CknSqsnUmUNeSvJ7BORQT7DI7YmQFhJjZdGoDpb_lqQFrw26MWAsJMCTITWvxnzCcc89kYaBua0MWQJ0U7gPX6G0uzmNgbdFE7gVjuSEZ3_1mSB-RqDC8ak8LtWr5QXHLrhJyZ_vU0lPgVhMc8qiE7KgaCgYKAWYSARMSFQG1tDrpS94rfWPayq1mupu5iWY3-Q0163';
  const message = {
    to: 'ridemailclient@gmail.com',
    body: 'last try mail from using node fetch',
    replyTo: 'loveysunshine01@gmail.com',
    subject: 'SIMPLE ATTACHMENT WITH inline and simple',
    text: 'Hellooo rid!!!!!!!!!!! How are you doing! SENDIN WITH ATTACHMENT with only  /n/r',
    html: `<html><body><h1>Hello</h1><p>This has the attachment.<img src="cid:img@abc.com"/></p></body></html>`,
  };
  
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  };

  const attachmemt = fs.readFileSync(path.join(__dirname,"thumbnail_Rapidopsn_1.jpg"));
  const attachmemt1 = fs.readFileSync('/home/ad.rapidops.com/priya.intwala/Downloads/Internship Ongoing Letter_Priya Intwala.pdf');

  const encodedAttachment1 = attachmemt1.toString("base64");
  const encodedAttachment = attachmemt.toString("base64");



  const boundary = "hello"

  const messageBody =[
    `--${boundary}`,
         `Content-Type: text/plain; charset="UTF-8"`, 
         `Content-Disposition: inline`, 
         "", 
         message.body, 
         "", 
         `--${boundary}`,
          `Content-Type: text/html; charset="UTF-8"`, 
          `Content-Disposition: inline`, 
          "", message.html,
           "",
            `--${boundary}`, 
            `Content-Type: application/jpg; name="thumbnail_Rapidopsn_1.jpg"`, 
            `Content-Disposition: inline; filename="thumbnail_Rapidopsn_1.jpg"`,
            `Content-Id: img@abc.com`, 
             `Content-Transfer-Encoding: base64`, 
             "", encodedAttachment,
             "", 
             `--${boundary}`, 
             `Content-Type: application/jpg; name="Internship Ongoing Letter_Priya Intwala.pdf"`, 
             `Content-Disposition: attachment; filename="Internship Ongoing Letter_Priya Intwala.pdf"`, 
              `Content-Transfer-Encoding: base64`, 
              "", 
             encodedAttachment1,
              "", 
              `--${boundary}--`,
            ].join("\r\n"); 
 
  
  const encodedMessage = Buffer.from(
    `To: ${message.to}\r\n` +
    `Subject: ${message.subject}\r\n` +
    `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n` +
    `${messageBody}\r\n`
).toString("base64");
  
  const data = JSON.stringify({
    raw: encodedMessage
  });
  console.log(data,"data");

  fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: headers,
    body: data
  })

  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
};
sendMessage();