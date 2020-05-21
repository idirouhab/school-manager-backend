const db = require("../models");
const Exam = db.exam;

exports.findUserByExamId = (id) => {
    return Exam.findById(id).populate('userId', ['name', 'username']);
};
