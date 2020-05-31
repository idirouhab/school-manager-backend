const providers = {
    "answer": require("../providers/answer.provider"),
    "exam": require("../providers/exam.provider"),
    "user": require("../providers/user.provider"),
    "folder": require("../providers/folder.provider"),
};


const isRoot = (req) => {
    return req.role === 'ROOT';

};

exports.findAll = (req, res) => {
    if (isRoot(req, res)) {
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
                        err.message || "Some error occurred while retrieving document."
                });
            });
    } else {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving document."
        });
    }
};

exports.findOne = (req, res) => {
    if (isRoot(req, res)) {

        const documentName = req.params.documentName;
        const documentId = req.params.documentId;
        providers[documentName]
            .findOne(documentId)
            .then(data => {
                if (!data)
                    res.status(404).send({message: "Not found Answer with id " + id});
                else res.send(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving Answer with id=" + id});
            });
    } else {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving document."
        });
    }
};
