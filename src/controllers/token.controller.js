const refreshTokenProvider = require("../providers/refresh-token.provider");
const userProvider = require("../providers/user.provider");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  const { refresh_token } = req.body;
  if (refresh_token) {
    refreshTokenProvider.findOne(refresh_token).then(data => {
      if (data) {
        userProvider.findOne(data.userId).then(user => {
          const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME });
          res.status(200).json({ accessToken });
        });
      } else {
        res.status(401).send();
      }
    });
  } else {
    res.status(401).send();
  }
};

exports.delete = (req, res) => {
  const { refresh_token } = req.body;
  if (refresh_token) {
    refreshTokenProvider
      .findOne(refresh_token)
      .then(data => {
        if (data) {
          data.remove();
          res.sendStatus(204);
        } else {
          res.sendStatus(401);
        }
      });
  } else {
    res.sendStatus(401);
  }
};

