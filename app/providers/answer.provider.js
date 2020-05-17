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
    return Answer.findById(id)
};

exports.update = (id, data) => {

    return Answer.findByIdAndUpdate(
        id,
        data,
        {useFindAndModify: false}
    );
};

exports.delete = (id) => {
    return Answer.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`
                });
            } else {
                res.send({
                    message: "Exam was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exam with id=" + id
            });
        });
};


