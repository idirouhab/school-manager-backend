const {fromString} = require('uuidv4')
const imageService = require('../services/image.service')
const getStream = require('into-stream');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const containerName = 'exam-manager';

exports.create = (file, userId) => {
    const imageId = fromString(new Date() + userId);
    const mimeType = file.mimetype;

    try {
        return imageService.resize(file.buffer).then((image) => {
            const stream = getStream(image);
            const streamLength = image.length;
            const options = {contentSettings: {contentType: mimeType}};

            return blobService.createBlockBlobFromStream(containerName, imageId, stream, streamLength, options, (err) => {

                return imageId;
            })
        })

    } catch (e) {
        throw e;
    }

};

exports.delete = (fileId, cb) => {
    return blobService.deleteBlobIfExists(containerName, fileId, cb);
};