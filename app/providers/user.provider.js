const db = require("../models");
const Exam = db.exam;
const User = db.user;

exports.findUserByExamId = (id) => {
    return Exam.findById(id).populate('userId', ['name', 'email']);
};


exports.findAll = () => {
    return User.find({}, {password: 0});
};

exports.findOne = (id) => {
    return User.findById((id), {password: 0});

};

exports.update = (id, user) => {
    return User.findByIdAndUpdate(
        id,
        user,
        {useFindAndModify: false}
    );
};


exports.delete = (id) => {
    return User.findByIdAndRemove(id);
};
