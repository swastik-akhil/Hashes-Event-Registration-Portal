const nodemailer = require("nodemailer");

async function sendMail(recieverEmailId, orderId){
  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : process.env.EMAIL_ID,
      pass : process.env.EMAIL_PASS
    }
  })

  console.log("inside email helper ")
  console.log(`$orderId is ${orderId}`)

  const mailOptions = {
    form : process.env.EMAIL_ID,
    to : recieverEmailId,
    subject : "Registration successful",
    text :`The trasaction to BRL for hashes has been successfully done and your order id is ${orderId}`


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