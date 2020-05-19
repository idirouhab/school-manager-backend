const provider = require("../providers/exam.provider")
const answerProvider = require("../providers/answer.provider")

exports.create = (req, res) => {
    provider.create(req.body.exam, req.userId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Exam."
            });
        });

};

exports.findAll = (req, res) => {
    provider.findAll(req.userId, req.role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


exports.findOne = (req, res) => {
    provider
        .findOne(req.params.id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Exam with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Exam with id=" + id});
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    provider.update(req.params.id, req.body.exam)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Exam with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({message: "Exam was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exam with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const userId = req.userId;
    provider.delete(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`
                });
            } else {
                answerProvider.deleteAnswers(data.answers)
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot delete Answers. Maybe Answers was not found!`
                            });
                        } else {
                            res.send({
                                message: "Answers was deleted successfully!"
                            });
                        }
                    }).catch(err => {
                    res.status(500).send({
                        message: "Could not delete Answer"
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exam with id=" + id
            });
        });
};

