import * as nodemailer from "nodemailer";
import {SentMessageInfo} from "nodemailer";
import {SmtpOptions} from "nodemailer-smtp-transport";

import fs from "fs";
import handlebars from "handlebars";

const i18n = require("../config/i18n");

const config: SmtpOptions = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
};
const transport = nodemailer.createTransport(config);


class EmailService {
    sendConfirmation(user, token, host): Promise<SentMessageInfo> {
        const source = fs.readFileSync("templates/confirmation.html", "utf-8");
        const template = handlebars.compile(source);
        const replacements = {
            title: i18n.t("confirm.title"),
            body: i18n.t("confirm.body"),
            confirmationText: i18n.t("confirm.button"),
            confirmationLink: `https://${host}/login/confirmation/${token.token}`,
        };

        const message = {
            from: `Tinaptic <${process.env.MESSAGE_FROM}>`,
            to: process.env.RECEIVER || user.email,
            subject: i18n.t("account_verification"),
            html: template(replacements),
            generateTextFromHTML: true,
        };

        return transport.sendMail(message);
    };

    newExam(exam, answer) {
        const source = fs.readFileSync("templates/newExam.html", "utf-8");
        const template = handlebars.compile(source);
        const replacements = {
            title: i18n.t("newExam.title", {username: exam.userId.name}),

            body: i18n.t("newExam.body", {
                playerName: answer.playerName,
                examTitle: exam.text,
                score: answer.score,
                numberQuestions: exam.questions.length,
            }),
        };
        const message = {
            from: `Tinaptic <${process.env.MESSAGE_FROM}>`,
            to: process.env.RECEIVER || exam.userId.email,
            subject: i18n.t("newExam.subject"),
            html: template(replacements),
            generateTextFromHTML: true,
            bcc: process.env.BCC
        };
        return transport.sendMail(message);
    }
}


export default new EmailService();