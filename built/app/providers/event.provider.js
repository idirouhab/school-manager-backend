const db = require("../models");
const Event = db.event;
exports.create = (data) => {
    const event = new Event(data);
    return event
        .save(event);
};
exports.findAll = (userId, role) => {
    let filter = role === 'ROOT' ? {} : {
        "userId": userId
    };
    return Event.find(filter).populate('examId', 'text');
};
exports.findOne = (id) => {
    return Event.findById(id);
};
exports.delete = (data) => {
    return Event.findOneAndRemove({ examId: data.examId, date: data.date, userId: data.userId });
};
