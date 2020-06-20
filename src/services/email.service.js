const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const { i18n } = require('../config/i18n');

const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
const transport = nodemailer.createTransport(config);

exports.sendConfirmation = (user, token, host) => {
  const source = fs.readFileSync('../templates/confirmation.html', 'utf-8');
  const template = handlebars.compile(source);
  const replacements = {
    title: i18n.t('confirm.title'),
    body: i18n.t('confirm.body'),
    confirmationText: i18n.t('confirm.button'),
    confirmationLink: `https://${host}/login/confirmation/${token.token}`,
  };

  const message = {
    from: `Tinaptic <${process.env.MESSAGE_FROM}>`,
    to: process.env.RECEIVER || user.username,
    subject: i18n.t('account_verification'),
    html: template(replacements),
    generateTextFromHTML: true,
  };

  return transport.sendMail(message);
};

exports.newExam = (exam, answer) => {
  const source = fs.readFileSync('../templates/new-exam-completed.html', 'utf-8');
  const template = handlebars.compile(source);
  const replacements = {
    title: i18n.t('newExam.title', { username: exam.userId.name }),

    body: i18n.t('newExam.body', {
      playerName: answer.playerName,
      examTitle: exam.text,
      score: answer.score,
      numberQuestions: exam.questions.length,
    }),
  };

  const message = {
    from: `Tinaptic <${process.env.MESSAGE_FROM}>`,
    to: process.env.RECEIVER || exam.userId.username,
    subject: i18n.t('newExam.subject'),
    html: template(replacements),
    generateTextFromHTML: true,
    bcc: process.env.BCC,
  };
  return transport.sendMail(message);
};
