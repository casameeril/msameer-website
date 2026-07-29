const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Casameerilahi@gmail.com',
    pass: 'adce ncyammnqfxtq'.replace(/\s/g, '') // remove spaces just in case
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("Error:", error);
    process.exit(1);
  } else {
    console.log("Server is ready to take our messages");
    process.exit(0);
  }
});
