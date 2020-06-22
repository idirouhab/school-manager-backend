const provider = require("../providers/exam.provider");
const answerProvider = require("../providers/answer.provider");
const { validationResult } = require("express-validator");

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  provider.create(req.body, req.user.id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exam.",
      });
    });
};

exports.findAll = (req, res) => {
  provider.findAll(req.user.id, req.user.role)
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
        res.status(404).send({ message: "Not found Exam with id " + id });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "Error retrieving Exam with id=" });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const exam = req.body;

  provider.update(id, exam)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Exam with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Exam was updated successfully." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Exam",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  provider.delete(req.params.id, userId)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Exam with id=${id}. Maybe Exam was not found!`,
        });
      } else {
        answerProvider.deleteAnswers(data.answers)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: "Cannot delete Answers. Maybe Answers was not found!",
              });
            } else {
              res.send({
                message: "Answers was deleted successfully!",
              });
            }
          }).catch(() => {
          res.status(500).send({
            message: "Could not delete Answer",
          });
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Exam with id=" + id,
      });
    });
};
