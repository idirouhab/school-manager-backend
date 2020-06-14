const refreshTokenProvider = require("../providers/refreshToken.provider");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  const { refresh_token } = req.body;

  if (refresh_token) {
    refreshTokenProvider.findOne(refresh_token).then(data => {
      if (data) {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
          if (err) {
            return res.status(401).send();
          }
          const accessToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME });
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

