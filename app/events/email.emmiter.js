const events = require('events');
const eventEmitter = new events.EventEmitter();
const userProvider = require("../providers/user.provider");
const nodemailer = require('nodemailer');

eventEmitter.on('notify_teacher_new_exam', (examId, answer) => {
    userProvider.findUserByExamId(examId).then(data => {
        const text = `Hola ${data.userId.name}, ${answer.playerName} ha completado la terea "${data.text}" con una nota de ${answer.score} sobre ${data.questions.length}.`
        const message = {
            from: `Exam Manager <${process.env.MESSAGE_FROM}>`,
            to: data.userId.username,
            subject: `Nuevo examen realizado`,
            text: text
        };
        const transport = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        };

        console.log(message,);
        nodemailer.createTransport(transport).sendMail(message);
    });
});

module.exports = eventEmitter;
