const nodemailer = require("nodemailer");

const emailer = async ({ to, subject, text, html }) => {
  if (!to) {
    throw new Error("`to` parameter missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const info = await transporter.sendMail({
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = emailer;
