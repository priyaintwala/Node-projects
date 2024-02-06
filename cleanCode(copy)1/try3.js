const { google } = require('googleapis'); 
const { OAuth2 } = google.auth; 

const message = { 
    to: 'loveysunshine01@gmail.com', 
    subject: 'Harit and You!', 
    text: 'are amazing togetger!!!!,stay together and have fun please come to the waterpark you csan invite harit we will have fun so much english blah blah bye sendwith not i phone but api', 
}; 

const oauth2Client = new OAuth2( 
    '100947048399-9fsvaf4u3lg5j7c0hnrbs5rl7496vqo4.apps.googleusercontent.com', 
    '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', 
    'http://127.0.0.1:5501/profile.html' 
); 

oauth2Client.setCredentials({ 
    access_token: 'ya29.a0AWY7CknwU611d6KYXk5c26Be7OlRiGkXF9MiqUCyfjO4LuH003XyNU7m-Huiadn_ZuQsLrsx5Y3u4ahblabdiEoW6hLfJtFuoX2GIi5LSttlDbCbJtib9c1YN97FN-g7PQNl_OrkO4P-8lMZDs_eI6496YOAaCgYKARgSARMSFQG1tDrpO_6hJ7DmtZWJBLNiaby2hg0163', 
    refresh_token: '1//0guZcamEvOxwfCgYIARAAGBASNwF-L9IrQRR3UwBx2SWgJ8CmxKGDEHNq1HyohNEDpGSDVTM-cBjrvP8qs7qzcShjDv4lPCBJMCw', 
}); 

const gmail = google.gmail({ 
    version: 'v1', 
    auth: oauth2Client 
}); 

const messageParts = [ 
    'From: ridemailclient@gmail.com', 
    `To: ${message.to}`, 
    'Content-Type: text/html; charset=utf-8', 
    'MIME-Version: 1.0', 
    `Subject: ${message.subject}`, '', `${message.text}`, 
]; 
    const messageText = messageParts.join('\n'); 
    const encodedMessage = Buffer.from(messageText) 
    .toString('base64') 
    .replace(/\+/g, '-') 
    .replace(/\//g, '_') 
    .replace(/=+$/, ''); 
    
    gmail.users.messages.send({ 
        userId: 'me', 
        requestBody: { raw: encodedMessage, 
        },
     });