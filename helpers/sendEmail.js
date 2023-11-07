const nodemailer = require('nodemailer');
const { EMAIL, PASS, SMTP, TO_EMAIL } = process.env;
const fs = require('fs');

async function sendEmail(bodyWithFiles) {
  const { name, email, phone, company, message, multiple_files } =
    bodyWithFiles;

  console.log(bodyWithFiles);

  const html = `
<h1>NEW CUSTOMER REQUEST</h1>
<p><strong>Customer name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}

`;

  const attachedFiles = multiple_files.map(file => {
    return {
      filename: file, 
      content: fs.createReadStream(file),
    };
  });

  const transporter = nodemailer.createTransport({
    host: SMTP,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL,
    to: TO_EMAIL,
    subject: `NEW REQUEST FROM CLIENT ${name.toUpperCase()}`,
    html: html,
    attachments: attachedFiles,
  });
}

module.exports = sendEmail;
