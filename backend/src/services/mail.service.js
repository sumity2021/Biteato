const nodemailer = require("nodemailer");

async function sendResetEmail(to, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Password Reset",
    html: `<p>You requested a password reset</p><p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">here</a> to reset your password</p> <p>This link will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
