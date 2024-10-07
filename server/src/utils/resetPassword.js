import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const currentFilePath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilePath));
// # currentDirectory = D:\VI_Projects\theia\server\src\utils

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

async function sendPwdResetLink(email, token, fname) {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../templates/reset_pwd.ejs`,
      { clientBaseUrl, token, fname, contactEmail }
    );

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Reset Password",
      html: renderedContent,
    };
    const verificationInfo = await transporter.sendMail(mailOptions);
    return verificationInfo;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export { sendPwdResetLink };
