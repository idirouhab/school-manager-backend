const providers = {
  answer: require("../providers/answer.provider"),
  exam: require("../providers/exam.provider"),
  user: require("../providers/user.provider"),
  folder: require("../providers/folder.provider"),
};

exports.findAll = (req, res) => {
  const documentName = req.params.documentName;
  const userId = req.userId;
  const role = req.role;
  providers[documentName].findAll(userId, role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving document.",
      });
    });
};

exports.findOne = (req, res) => {
  const documentName = req.params.documentName;
  const id = req.params.id;
  providers[documentName]
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
  const documentName = req.params.documentName;
  const id = req.params.id;
  const document = req.body.document;
  providers[documentName]
    .update(id, document)
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
