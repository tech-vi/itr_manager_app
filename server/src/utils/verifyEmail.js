import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";

const currentFilePath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilePath));

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
    // const templatePath = `${currentDirectory}/../templates/verification_mail.ejs`;
    const templatePath = path.join(
      currentDirectory,
      "../public/templates/verification_mail.ejs"
    );

    console.log("Template path:", templatePath);
    const renderedContent = await ejs.renderFile(templatePath, {
      clientBaseUrl,
      verification_token,
      fname,
      contactEmail,
    });

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
