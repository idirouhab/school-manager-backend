const fs = require('fs')
let path = 'uploads/'


exports.create = (req, res) => {
    const data = {
        uuid: req.imageName
    };

    res.send(data);
};


exports.delete = (req, res) => {
    try {
        fs.unlinkSync(path + req.param.id);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the Image."
        });
    }
};
