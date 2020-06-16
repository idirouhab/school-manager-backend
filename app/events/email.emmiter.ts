const emailService = require("../services/email.service");
const events = require('events');
const eventEmitter = new events.EventEmitter();
const userProvider = require("../providers/user.provider");


eventEmitter.on('notify_teacher_new_exam', (examId, answer) => {
    userProvider.findUserByExamId(examId).then(exam => {
        emailService.newExam(exam, answer)
    }).catch(e => {
        console.log(e);
    })
});


export default EventEmitter;
