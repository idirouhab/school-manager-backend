const imageProvider = require('../providers/image.provider');

exports.create = (req, res) => {
  try {
    const { key } = req.file;
    res.send({
      uuid: key,
    });
  } catch (e) {
    res.status(500).send({
      message: 'Some error occurred while creating the Image.',
    });
  }
};

exports.findOne = (req, res) => {
  const blobName = req.params.id;
  imageProvider.findOne(blobName, res).then((object) => {
    object.on("httpHeaders", (httpCode, headers) => {
      res.set("Content-Type", headers["content-type"]);
    }).createReadStream()
      .pipe(res);
  });
};

exports.findAll = (req, res) => {
  imageProvider.findAll()
    .then(images => {
      res.send(images);
    });
};

exports.delete = (req, res) => {
  imageProvider.delete(req.params.id)
    .then(() => {
      res.send();
    }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the Image.",
    });
  });
};

