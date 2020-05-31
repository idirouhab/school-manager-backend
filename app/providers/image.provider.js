const {fromString} = require('uuidv4')
const imageService = require('../services/image.service')
const getStream = require('into-stream');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = process.env.CONTAINER_NAME;

exports.findOne = (blobName, res) => {
    return new Promise((resolve, reject) => {
        blobService.getBlobToStream(containerName, blobName, res, function (error, blob) {
            if (!error) { // blob retrieved
                resolve(res)
                //res.end();
            } else {
                reject(res)
               // res.end();
            }
        });
    })
};

exports.create = (file, userId) => {
    const imageId = fromString(new Date() + userId);
    const mimeType = file.mimetype;

    try {
        return imageService.resize(file.buffer).then((image) => {
            const stream = getStream(image);
            const streamLength = image.length;
            const options = {
                contentSettings: {
                    contentType: mimeType,

                },
                metadata: {
                    userId
                }
            };

            return blobService.createBlockBlobFromStream(containerName, imageId, stream, streamLength, options, (err) => {

                return imageId;
            })
        })

    } catch (e) {
        throw e;
    }

};

exports.findAll = () => {

    return new Promise((resolve, reject) => {
        let listImageIds = [];
        blobService.listBlobsSegmented(containerName, null, (err, data) => {
            data.entries.forEach(entry => {
                listImageIds.push(
                    {
                        id: entry.name,
                        contentLength: entry.contentLength
                    }
                )
            });
            resolve(listImageIds)
        });

    })
};

exports.delete = (fileId, cb) => {
    return blobService.deleteBlobIfExists(containerName, fileId, cb);
};