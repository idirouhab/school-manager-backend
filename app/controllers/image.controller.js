const imageProvider = require('../providers/image.provider');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = 'exam-manager';


exports.create = (req, res) => {
    try {
        imageProvider.create(req.file, req.userId).then((data) => {
            if (!data) {
                res.status(500).send({
                    message: "Some error occurred while creating the Image."
                });
            } else {
                res.send({
                    uuid: data.name
                })
            }
        })
    } catch (e) {
        res.status(500).send({
            message: "Some error occurred while creating the Image."
        });
    }
};

exports.findOne = (req, res) => {
    const blobName = req.params.id;
    blobService.getBlobToStream(containerName, blobName, res, function (error, blob) {
        if (!error) { // blob retrieved
            res.end(); // no need to writeHead
        } else {
            res.end();
        }
    });
};

exports.delete = (req, res) => {
    imageProvider.delete(req.params.id, (err)=>{
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Image."
            });
            return
        }
        res.send({});
    });

};

