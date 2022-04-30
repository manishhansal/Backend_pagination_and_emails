const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3829b675cea028",
      pass: "111c3ce6cc13ed"
    }
  });

module.exports = transport;