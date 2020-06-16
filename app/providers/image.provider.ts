import {fromString} from "uuidv4";
import getStream from "into-stream";
import azureStorage from "azure-storage";

const blobService = azureStorage.createBlobService();
const containerName = process.env.CONTAINER_NAME;


class ImageProvider {
    findOne(blobName, res): Promise<any> {
        return new Promise((resolve, reject) => {
            blobService.getBlobToStream(containerName, blobName, res, function (error, blob) {
                if (!error) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    };

    create(file, userId): Promise<any> {
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
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    findAll(): Promise<any> {
        return new Promise((resolve) => {
            let listImageIds = [];
            blobService.listBlobsSegmented(containerName, null, (err, data) => {
                data.entries.forEach(entry => {
                    listImageIds.push(
                        {
                            id: entry.name,
                            contentLength: entry.contentLength
                        }
                    );
                });
                resolve(listImageIds);
            });

        });
    };

    delete(fileId, cb): void {
        return blobService.deleteBlobIfExists(containerName, fileId, cb);
    };
}

export default new ImageProvider();