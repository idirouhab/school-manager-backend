const db = require("../models");
const folderProvider = require("../providers/folder.provider");


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
                    err.message || "Some error occurred while creating the Folder."
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
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


exports.findOne = (req, res) => {
    const folderId = req.params.id;
    const userId = req.userId;
    const role = req.role;

    folderProvider
        .findOne(folderId, userId, role)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Folder with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Folder with id=" + id});
        });
};