const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');
const {i18n} = require("../config/i18n")

const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
};
const transport = nodemailer.createTransport(config);

exports.newExam = (exam, answer) => {
    const source = fs.readFileSync('templates/newExam.html', 'utf-8');
    const template = handlebars.compile(source);
    const replacements = {
        title: i18n.t('newExam.title', {username: exam.userId.name}),

        body: i18n.t('newExam.body', {
            playerName: answer.playerName,
            examTitle: exam.text,
            score: answer.score,
            numberQuestions: exam.questions.length,
        }),
    };

    const message = {
        from: `Tinaptic <${process.env.MESSAGE_FROM}>`,
        to: exam.userId.username,
        subject: i18n.t('newExam.subject'),
        html: template(replacements),
        generateTextFromHTML: true,
        bcc: process.env.BCC
    };
    return transport.sendMail(message)
};