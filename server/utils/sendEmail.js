const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Configure the email transporter (use your SMTP credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

/**
 * Send an email with attachments
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 * @param {Array} attachments - List of files
 */
const sendEmail = async (subject, text, attachments) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ahiatt191@gmail.com, ahiatt19@byu.edu", // Sending to yourself
      subject,
      text,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
