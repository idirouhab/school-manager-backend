const eventEmitter = require("../events/email.emmiter");

const provider = require("../providers/answer.provider");
const examProvider = require("../providers/exam.provider");

exports.create = (req, res) => {
  const answer = req.body;
  const examId = answer.examId;

  provider.create(req.body)
    .then(data => {
      examProvider.updateExamAnswers(examId, data._id).then(
        (data) => {
          if (data.notify) {
            eventEmitter.emit("notify_teacher_new_exam", examId, answer);
          }
          res.send(data);
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer.",
      });
    });
};

exports.findAll = (req, res) => {
  provider.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  provider
    .findOne(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Answer with id " + id });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "Error retrieving Answer with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const answer = req.body;

  provider.update(id, answer)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Answer with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Answer was updated successfully." });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Answer with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  provider.delete(id, userId)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`,
        });
      } else {
        res.send({
          message: "Answer was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Answer with id=" + id,
      });
    });
};
