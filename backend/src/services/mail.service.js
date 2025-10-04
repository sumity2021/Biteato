const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendResetEmail(to, resetToken) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const msg = {
    to: to,
    from: process.env.EMAIL_FROM,
    subject: "Password Reset",
    html: `<p>You requested a password reset</p>
           <p>Click <a href="${resetLink}">here</a> to reset your password</p>
           <p>This link will expire in 10 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Reset email sent to", to);
  } catch (err) {
    console.error("SendGrid error:", err);
    throw err;
  }
}

module.exports = { sendResetEmail };
