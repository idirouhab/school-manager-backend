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
            } else {
                reject(res)
            }
        });
    })
};

exports.create = (file, userId) => {
    const imageId = fromString(new Date() + userId);
    const mimeType = file.mimetype;

    return new Promise((resolve, reject) => {
        try {
            const stream = getStream(file.buffer);
            const streamLength = file.buffer.length;
            const options = {
                contentSettings: {
                    contentType: mimeType,
                },
                metadata: {
                    userId
                }
            };
            return blobService.createBlockBlobFromStream(containerName, imageId, stream, streamLength, options, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        {
                            filename: imageId,
                            originalname: file.originalname,
                            size: streamLength,
                        }
                    );
                }
            })
        } catch (e) {
            reject(e);
        }
    });
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