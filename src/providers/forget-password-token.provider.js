const db = require('../models');
const ResetPasswordToken = db.resetPasswordToken;
const crypto = require('crypto');

exports.create = (userId) => {
    const data = {
        userId,
        token: crypto.randomBytes(16).toString('hex')
    };
    const token = new ResetPasswordToken(data);
    return token
        .save(token);
};

exports.findOne = (userId, token) => {
    return ResetPasswordToken.findOne({
        userId: userId,
        token: token
    });
};

exports.update = (id, data) => {
    return ResetPasswordToken.findByIdAndUpdate(
        id,
        data,
        {useFindAndModify: false},
    );
};
