const eventProvider = require("../providers/event.provider");

exports.create = (req, res) => {
  const data = {
    examId: req.body.examId,
    date: req.body.date,
    userId: req.userId,
  };

  eventProvider.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
};

exports.findAll = (req, res) => {
  eventProvider.findAll(req.userId, req.role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  eventProvider
    .findOne(req.params.id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Event with id " + id });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "Error retrieving Event with id=" });
    });
};

exports.delete = (req, res) => {

  const data = {
    examId: req.body.examId,
    date: req.body.date,
    userId: req.userId,
  };

  eventProvider.delete(data)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event. Maybe Exam was not found!`,
        });
      } else {
        res.send({
          message: "Event was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Event",
      });
    });
};
