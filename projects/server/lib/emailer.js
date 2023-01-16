const nodemailer = require("nodemailer");

const emailer = async ({ to, subject, text, html }) => {
  if (!to) {
    throw new Error("`to` parameter missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wiredindonesia@gmail.com",
      pass: "cgoowkvsynqnszvc",
    },
    tls: {
      rejectUnauthorized: false,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/assets/logo.png",
        cid: "logo",
      },
    ],
  });
};

module.exports = emailer;
