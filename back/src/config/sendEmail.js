const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 465,
    auth:{
        user:'qweasdzxc0210@naver.com',
        pass:'testingmail22'
    }
});

module.exports = smtpTransport;