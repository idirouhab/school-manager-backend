const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userProvider = require("../providers/user.provider");
const emailService = require("../services/email.service");
const tokenProvider = require("../providers/token.provider");
const refreshTokenProvider = require("../providers/refreshToken.provider");
const newrelic = require("newrelic");

exports.confirmation = (req, res) => {
  const token = req.params.token;
  tokenProvider.findOne(token)
    .then((token) => {
      if (!token) return res.status(404).send({ message: "We were unable to find a valid token. Your token my have expired." });
      const userId = token.userId;
      userProvider.update(userId, { isVerified: true }).then(() => {
        res.redirect("https://tinaptic.com");
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
    });
};

exports.create = (req, res) => {
  const userBody = req.body.user;
  const { username, password, name, lastName, language } = userBody;
  const data = {
    username,
    password,
    name,
    lastName,
    language,
  };

  userProvider.findUserByUsername(username)
    .then(exist => {
      if (exist) {
        res.send({ error: "email_already_exist" });
      } else {
        userProvider.create(data)
          .then(user => {
            tokenProvider.create(user).then(dataToken => {
              emailService.sendConfirmation(user, dataToken, req.headers.host).then(() => {
                res.send();
              }).catch((err) => {
                res.send({
                  error: "email_not_sent",
                  e: err.message
                });
              });
            }).catch(err => {
              res.status(500)
                .send({ message: err.message });
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user.",
            });
          });
      }
    }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user.",
    });
  });
};

exports.findOne = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  userProvider.findUserByUsername(username).then(user => {
    if (!user) {
      res.status(404).send({ error: "email_doesnt_exist" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        if (!user.isVerified || user.isBlocked) return res.status(403).send({ error: "Your account has not been verified." });
        const token = jwt.sign(
          { user },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME });
        const refreshToken = jwt.sign(
          { user },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
          });

        refreshTokenProvider.findByUser(user.id).then((data) => {
          if (data) {
            data.refreshToken = refreshToken;
            data.save();
          } else {
            refreshTokenProvider.create(user.id, refreshToken);
          }
        });

        const tokens = { token, refreshToken };

        res.send({ tokens });
      } else {
        res.status(401).send({ error: "Invalid email or password" });
      }
    }
  })
    .catch(err => {
      newrelic.noticeError(err);
      res
        .status(500)
        .send({ error: "Error retrieving User", e: err.message });
    });
};

exports.findAll = (req, res) => {
  if (req.role !== "ROOT") {
    res.status(403).send({ message: "Forbidden" });
    return;
  }

  userProvider.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.update = (req, res) => {
  const deleteUserId = req.params.id;
  const { user } = req.body;
  if (req.role !== "ROOT") {
    res.status(403).send({ message: "Forbidden" });
    return;
  }
  userProvider.update(deleteUserId, user).then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update User with id=${deleteUserId}. Maybe User was not found!`,
      });
    } else {
      res.send({
        message: "User was updated successfully!",
      });
    }
  }).catch(() => {
    res.status(500).send({
      message: "Could not delete User with id=" + deleteUserId,
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  if (req.role !== "ROOT") {
    res.status(403).send({ message: "Forbidden" });
    return;
  }

  userProvider.delete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`,
        });
      } else {
        res.send({
          message: "Answer was deleted successfully!",
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Answer with id=" + id,
      });
    });
};
