const nodemailer = require('nodemailer');

// Create a transporter object
let transporter = nodemailer.createTransport({
  service: 'gmail',
  
  auth: {
    user: 'loveysunshine01@gmail.com',
    pass: 'ikmqtmbguhxcxmvt',
  },
 
});

// Create an email message
let mailOptions = {
  from: 'loveysunshine01@gmail.com',
  to: 'ridemailclient@gmail.com',
  subject: 'Node mailer',
  text: 'one inline and 1 external attachemt',
  html:'<p>This email contains an inline image</p><img src="cid:image1"/>',
  attachments:[
    {
        filename: 'thumbnail_Rapidopsn_1.jpg',
        path: __dirname + '/thumbnail_Rapidopsn_1.jpg',
        cid: 'uniq-thumbnail_Rapidopsn_1.jpg',
    },
    {
      filename: 'attachment.jpg',
      path: '/home/ad.rapidops.com/priya.intwala/Downloads/attachment.jpg',
      cid: 'image1',
  }
  ]
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
