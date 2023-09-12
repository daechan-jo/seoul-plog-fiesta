import smtpTransport from '../config/nodeMailer';

async function mailSendApp(emailOptions) {
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(emailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info.response);
        smtpTransport.close();
      }
    });
  });
}

module.exports = mailSendApp;
