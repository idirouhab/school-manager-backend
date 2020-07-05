const { imageService } = require("../services/image.service");
exports.findOne = (blobName) => {
  return new Promise((resolve, reject) => {
    const s3 = imageService();
    s3.getObject({
      Bucket: process.env.IMAGES_BUCKET_NAME,
      Key: blobName
    }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

exports.findAll = () => {
  const s3 = imageService();
  return new Promise((resolve, reject) => {
    let listImageIds = [];
    s3.listObjects({ Bucket: process.env.IMAGES_BUCKET_NAME }, (err, data) => {
      if (err) reject(err);
      const { Contents } = data;
      Contents.forEach(content => {
        listImageIds.push(
          {
            id: content.Key,
            contentLength: content.Size,
          },
        );
      });
      resolve(listImageIds);
    });
  });
};

exports.delete = (fileId) => {
  const s3 = imageService();
  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: process.env.IMAGES_BUCKET_NAME, Key: fileId }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
