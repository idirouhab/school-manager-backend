const imageService = () => {
  const AWS = require("aws-sdk");
  const ID = process.env.AWS_ID;
  const SECRET = process.env.AWS_SECRET;

  return new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    params:{
      Bucket: process.env.IMAGES_BUCKET_NAME,
    }
  });
};

module.exports = { imageService };
