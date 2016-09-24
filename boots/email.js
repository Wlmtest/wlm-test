const nodemailer = require('nodemailer'),
    configData = require('./../config.json').mail;
let opt = configData.dev;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(opt.smtpOpt);

// setup e-mail data with unicode symbols

// send mail with defined transport object
transporter.sendMail(opt.mailOptions, (error, info) => {
  if(error){
    console.log(error);
    return false;
  }
  console.log('Message sent: ' + info.response);
});
