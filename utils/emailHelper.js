const nodemailer = require("nodemailer");

async function sendMail(receiverEmailId, orderId){
  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : process.env.EMAIL_ID,
      pass : process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: receiverEmailId,
    subject: "Registration successful",
    html: `
      <div style="font-family: 'Arial', sans-serif; background: linear-gradient(-45deg, #ff4e50, #fc913a, #f9d423, #eaeaea, #64b5f6, #1976d2, #64b5f6, #1976d2, #ff4e50); background-size: 400% 400%; padding: 20px;">
      <div style="background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; padding: 20px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Transaction Successful 🎉</h1>
          <p style="font-size: 18px;">Hey there!</p>
          <p style="font-size: 18px;">We're excited to let you know that your transaction for hashes has been successfully completed.</p>
          <p style="font-size: 18px;">Your order ID is: <strong>${orderId}</strong></p>
          <p style="font-size: 18px;">Thank you for being awesome! 😊</p>
          <p style="font-size: 18px;">Best regards,</p>
          <p style="font-size: 18px;">Blockchain Research Lab</p>
      </div>
      </div>

    `
  };

  try{
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch(e){
    console.log("Error while sending email:");
    console.error(e);
  }
}

module.exports = { sendMail };
