const db = require("../models");
const Exam = db.exam;
const User = db.user;

exports.findUserByExamId = (id) => {
    return Exam.findById(id).populate('userId', ['name', 'username']);
};

exports.findAll = () => {
    return User.find({}, {password: 0});
};

exports.delete = (id) => {
    return User.findByIdAndRemove(id);
};
