const mailer = require("nodemailer");
async function sendResetLinkEmail(email, resetLink) {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailoptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    html: `<p>Click <a href="${resetLink}">hear</a> to reset your password</p>`,
  };
  try {
    const result = await transporter.sendMail(mailoptions);
    console.log("Email sent", result.response);
  } catch (error) {
    console.log(error);
  }
}
async function sendConfirmationEmail(email, verificationLink) {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailoptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Email",
    html: `<p>your password was changed</p>`,
  };
  try {
    const result = await transporter.sendMail(mailoptions);
    console.log("Email sent", result.response);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  sendResetLinkEmail: sendResetLinkEmail,
  sendConfirmationEmail: sendConfirmationEmail,
};
