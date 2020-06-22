const imageProvider = require('../providers/image.provider');

exports.create = (req, res) => {
  try {
    imageProvider.create(req.file, req.user.id).then((data) => {
      if (!data) {
        res.status(500).send({
          message: 'Some error occurred while creating the Image.',
        });
      } else {
        res.send({
          uuid: data.filename,
        });
      }
    });
  } catch (e) {
    res.status(500).send({
      message: 'Some error occurred while creating the Image.',
    });
  }
};

exports.findOne = (req, res) => {
  const blobName = req.params.id;
  imageProvider.findOne(blobName, res).then(res => {
    res.end();
  }).catch(res => {
    res.end();
  });
};

exports.findAll = (req, res) => {

  imageProvider.findAll().then(images => {

    res.send(images);
  });
};

exports.delete = (req, res) => {
  imageProvider.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while deleting the Image.',
      });
      return;
    }
    res.send({});
  });

};

