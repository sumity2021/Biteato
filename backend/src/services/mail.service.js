const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
async function sendResetEmail(to, resetToken) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Password Reset",
      html: `<p>You requested a password reset</p>
             <p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">here</a> 
             to reset your password</p>
             <p>This link will expire in 10 minutes.</p>`,
    });
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}

module.exports = { sendResetEmail };
