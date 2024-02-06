
// const sendMessage = () => {
//   const accessToken = userdetails.userData.access_token;
//   const message = {
//     to: to,
//     from:from,
//     subject: subject,
//     text: text,
//     html:html,
//   };
  
//   const headers = {
//     'Authorization': 'Bearer ' + accessToken,
//     'Content-Type': 'application/json'
//   };

//   // const attachmemt = fs.readFileSync(path.join(__dirname,"thumbnail_Rapidopsn_1.jpg"));
//   const attachmemt1 = fs.readFileSync(filePath);

//   const encodedAttachment1 = attachmemt1.toString("base64");
//   // const encodedAttachment = attachmemt.toString("base64");

//   const boundary = "hello"

//   const messageBody =[
//     `--${boundary}`,
//          `Content-Type: text/plain; charset="UTF-8"`, 
//          `Content-Disposition: inline`, 
//          "", 
//          message.body, 
//          "", 
//          `--${boundary}`,
//           `Content-Type: text/html; charset="UTF-8"`, 
//           `Content-Disposition: inline`, 
//           "", message.html,
//            "",
//             `--${boundary}`, 
//             // `Content-Type: application/jpg; name="thumbnail_Rapidopsn_1.jpg"`, 
//             // `Content-Disposition: inline; filename="thumbnail_Rapidopsn_1.jpg"`,
//             // `Content-Id: img@abc.com`, 
//             //  `Content-Transfer-Encoding: base64`, 
//             //  "", encodedAttachment,
//             //  "", 
//             //  `--${boundary}`, 
//              `Content-Type: application/jpg; name="${fileName}"`, 
//              `Content-Disposition: attachment; filename="${fileName}"`, 
//               `Content-Transfer-Encoding: base64`, 
//               "", 
//              encodedAttachment1,
//               "", 
//               `--${boundary}--`,
//             ].join("\r\n"); 
 
  
//   const encodedMessage = Buffer.from(
//     `To: ${message.to}\r\n` +
//     `Subject: ${message.subject}\r\n` +
//     `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n` +
//     `${messageBody}\r\n`
// ).toString("base64");
  
//   const data = JSON.stringify({
//     raw: encodedMessage
//   });
//   console.log(data,"data");

//   fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
//     method: 'POST',
//     headers: headers,
//     body: data
//   })

//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
// };
// sendMessage();