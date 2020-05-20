const db = require("../models");
const Answer = db.answer;

exports.create = (data) => {
    const answer = new Answer(data);
    return answer
        .save(answer)
};

exports.findAll = () => {
    return Answer.find({});
};

exports.findOne = (id) => {
    return Answer.findById(id);
};

exports.update = (id, data) => {
    return Answer.findByIdAndUpdate(
        id,
        data,
        {useFindAndModify: false}
    );
};

exports.deleteAnswers = (ids) => {
    return Answer.remove({
        "_id": {
            $in: ids
        }
    })
};

exports.delete = (id, userId) => {

    return Answer.findByIdAndRemove(id);
};
