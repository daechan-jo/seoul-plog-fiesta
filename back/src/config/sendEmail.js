const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

module.exports = smtpTransport;
