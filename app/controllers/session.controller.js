const sessionProvider = require("../providers/session.provider");

exports.create = (req, res) => {
    const data = {
        userId: req.userId,
        currentPath: req.body.currentPath
    };
    sessionProvider.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Session."
            });
        });
};

exports.findAll = (req, res) => {
    sessionProvider.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sessions."
            });
        });
};
