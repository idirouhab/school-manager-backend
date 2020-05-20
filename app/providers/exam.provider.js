const db = require("../models");
const Exam = db.exam;

exports.create = (data, userId) => {
    data.userId = userId;

    const exam = new Exam(data);

    return exam
        .save(exam)
};

exports.updateExamAnswers = (examId, answerId) => {
    return Exam.findOneAndUpdate({"_id": examId},
        {"$push": {"answers": answerId}},
        {new: true})
};

exports.findAll = (userId, role) => {

    let filter = role === 'ROOT' ? {} : {
        "userId": userId
    };

    return Exam.find(filter).populate('userId', 'name');
};

exports.findOne = (id) => {
    return Exam.findById(id).populate('answers');
};

exports.update = (id, data) => {
    return Exam.findByIdAndUpdate(
        id,
        data,
        {useFindAndModify: false}
    );
};

exports.updateOne = (filter, data) => {
    return Exam.findOneAndUpdate(
        filter,
        data,
        {useFindAndModify: false}
    );
};

exports.delete = (id) => {
    return Exam.findByIdAndRemove(id)
};
