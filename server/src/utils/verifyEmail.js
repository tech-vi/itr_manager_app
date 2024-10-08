import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const currentFilePath = import.meta.url;
console.log("currentFilePath", currentFilePath);
const currentDirectory = dirname(fileURLToPath(currentFilePath));
console.log("currentDirectory", currentDirectory);
// # currentDirectory = server\src\utils

dotenv.config();

const clientBaseUrl = process.env.CLIENT_APP_BASE_URL;

const contactEmail = process.env.NODEMAILER_USER;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
});

async function sendVerificationEmail(email, verification_token, fname) {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../templates/verification_mail.ejs`,
      { clientBaseUrl, verification_token, fname, contactEmail }
    );

    console.log("renderedContent", currentDirectory);

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Verify Email",
      html: renderedContent,
    };
    const verificationInfo = await transporter.sendMail(mailOptions);
    return verificationInfo;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { sendVerificationEmail };
