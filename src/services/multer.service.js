const multerService = () => {
  const { imageService } = require("../services/image.service");
  const multer = require("multer");
  const multerS3 = require("multer-s3");
  return multer({
    storage: multerS3({
      s3: imageService(),
      bucket: process.env.IMAGES_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      storageClass: "REDUCED_REDUNDANCY",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      }
    })
  });
};

module.exports = { multerService };
