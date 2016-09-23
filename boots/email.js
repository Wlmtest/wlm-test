var nodemailer = require('nodemailer');
var configData = require('./../config.json').mail;
var envTest = process.env.Node_1001Test;
var opt;

if (envTest == 'release') {
  opt = configData.mst;
} else {
  opt = configData.dev;
}

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(opt.smtpOpt);

// setup e-mail data with unicode symbols

// send mail with defined transport object
transporter.sendMail(opt.mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});
