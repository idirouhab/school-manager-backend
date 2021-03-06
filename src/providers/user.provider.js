const db = require('../models');
const Exam = db.exam;
const User = db.user;
const bcrypt = require('bcryptjs');

exports.create = (data) => {
    const user = new User({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        name: data.name,
        lastName: data.lastName,
        language: data.language,
    });

    return user.save(user);
};

exports.updatePassword = (userId, password) => {
    return User.findByIdAndUpdate(
        userId,
        {
            password: bcrypt.hashSync(password, 10),
        },
        {useFindAndModify: false},
    );
};
exports.findUserByUsername = (username) => {
    return User.findOne({username: username});
};

exports.findUserByExamId = (id) => {
    return Exam.findById(id).populate('userId', ['name', 'username']);
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
        {useFindAndModify: false},
    );
};

exports.delete = (id) => {
    return User.findByIdAndDelete(id);
};
