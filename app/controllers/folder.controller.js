const folderProvider = require("../providers/folder.provider");
const examProvider = require("../providers/exam.provider");

exports.create = (req, res) => {
  const folder = req.body.folder;
  const userId = req.userId;

  folderProvider.create(folder, userId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Folder.",
      });
    });

};

exports.findAll = (req, res) => {
  const userId = req.userId;
  const role = req.role;
  folderProvider.findAll(userId, role)
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
  const userId = req.userId;
  const role = req.role;

  folderProvider
    .findOne(id, userId, role)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Folder with id " + id });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "Error retrieving Folder with id=" + id });
    });
};

exports.delete = (req, res) => {
  const userId = req.userId;
  const role = req.role;
  const id = req.params.id;

  folderProvider.delete(id, userId, role)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot delete Exam. Maybe Exam was not found!",
        });
      } else {
        examProvider.updateOne({ folderId: id, userId: userId }, { folderId: null })
          .then(() => {
            res.send({
              message: "Answers was Folder successfully!",
            });
          }).catch(() => {
          res.status(500).send({
            message: "Could not delete Answer",
          });
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Exam with id=",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  folderProvider.update(id, userId, req.body.folder)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Folder. Maybe Tutorial was not found!",
        });
      } else res.send({ message: "Exam was updated successfully." });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Folder",
      });
    });
};
