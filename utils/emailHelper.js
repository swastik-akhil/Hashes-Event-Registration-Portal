// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const {google} = require("googleapis");
// const mailHelper = async function(options){
//   // const config = {
//   //   service : "gmail",
//   //   auth : {
//   //     user : process.env.EMAIL_ID,
//   //     pass : process.env.EMAIL_PASS
//   //   }
//   // }
//     // const transporter = nodemailer.createTransport({
//     //     host: process.env.SMTP_HOST,
//     //     port: process.env.SMTP_PORT,
//     //     // secure: true,
//     //     auth: {
//     //       user: process.env.SMTP_USER,
//     //       pass: process.env.SMTP__PASS,
//     //     },
//     //   });

//     const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
//     oAuth2Client.setCredentials({refresh_token : process.env.REFRESH_TOKEN}); 
//     const accessToken = await oAuth2Client.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service : "gmail",
//       auth : {
//         type : "OAUTH2",
//         user : process.env.EMAIL_ID,
//         clientId : process.env.CLIENT_ID,
//         clientSecret : process.env.CLIENT_SECRET,
//         refreshToken : process.env.REFRESH_TOKEN,
//         accessToken : accessToken 
//       }
//     })

//       const mailId = process.env.EMAIL_ID
//     const message = {
//         from: `"Akhil Agrawal" <${mailId}>`,
//         to: options.email,  
//         subject: options.subject, 
//         text: options.message,
//     }
//     await transporter.sendMail(message);
// }

// module.exports = mailHelper

const nodemailer = require("nodemailer");

async function sendMail(recieverEmailId){
  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : process.env.EMAIL_ID,
      pass : process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    form : process.env.EMAIL_ID,
    to : recieverEmailId,
    subject : "Registration successful",
    text : "Your registration has been done successfully"
  }

  try{
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  }catch(e){
    console.log("Error while sending email");
    console,log(e);
  }


}

module.exports = {sendMail};