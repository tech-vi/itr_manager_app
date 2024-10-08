import ejs from "ejs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

const pwdResetTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        height: 100vh;
        display: grid;
        place-content: center;
        font-family: "Segoe UI", Arial, sans-serif;
        background-color: #fff;
      }

      .container {
        max-width: 600px;
        background-color: #fefefe;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }

      header {
        padding: 20px;
        color: #fff;
      }

      header h1 {
        color: #ff385c;
        font-size: 30px;
        font-weight: 700;
      }

      .message {
        width: 100%;
        padding: 20px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }

      .message h2,
      .message h3 {
        margin-bottom: 10px;
      }

      .message p {
        line-height: 1.5;
        margin-bottom: 10px;
      }

      .message p span {
        color: #ff385c;
        font-weight: 600;
      }

      .message .note {
        font-weight: 600;
      }

      .message .contact-us {
        font-weight: 600;
        text-decoration: none;
      }

      .message .btn-container {
        text-align: center;
      }

      .message .reset-btn {
        display: inline-block;
        text-decoration: none;
        background-color: #ff385c;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0 20px;
        border-radius: 6px;
        transition: background-color 0.3s ease;
      }

      .message .reset-btn:hover {
        background-color: #fb2b50;
      }

      footer {
        text-align: center;
        padding: 20px;
        color: #333;
        font-size: 14px;
        font-weight: 600;
      }

      footer p {
        margin-bottom: 10px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <header>
        <h1>Virtual India</h1>
      </header>
      <section class="message">
        <h2>Did you request to reset your password?</h2>
        <h3>Dear <%=fname%>,</h3>
        <p>
          We have received a request to reset the password for
          <span>Virtual India</span> account associated with your email.
        </p>
        <p>
          If you've lost your password or wish to reset it, <br />use the link
          in below to get started.!
        </p>
        <div class="btn-container">
          <a class="reset-btn" href="<%=clientBaseUrl%>/reset_pwd/<%=token%>"
            >Reset Password</a
          >
        </div>

        <p class="note">
          Note: This password reset link is only valid for 5 minutes.
        </p>
        <p>
          If you didn't request a password reset, please ignore this email.
          <br />
          Need further assistence?
          <a class="contact-us" href="mailto:<%=contactEmail%>">Contact us</a>
        </p>
        <p>- Virtual India Team</p>
      </section>
      <footer>
        <p>Sent with &hearts; from Virtual India.</p>
        <p></p>
        <p>&copy; 2024 Virtual India. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>
`;

async function sendPwdResetLink(email, token, fname) {
  try {
    const compiledTemplate = ejs.compile(pwdResetTemplate);

    const renderedContent = compiledTemplate({
      clientBaseUrl,
      token,
      fname,
      contactEmail,
    });

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
