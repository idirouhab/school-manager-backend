const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userProvider = require("../providers/user.provider");
const emailService = require("../services/email.service");
const tokenProvider = require("../providers/token.provider");

exports.confirmation = (req, res) => {
  const token = req.params.token;
  tokenProvider.findOne(token)
    .then((token) => {
      if (!token) return res.status(400).send({ message: "We were unable to find a valid token. Your token my have expired." });
      const userId = token.userId;
      userProvider.update(userId, { isVerified: true }).then((data => {
        res.redirect("https://tinaptic.com");
      })).catch(err => {
        res.status(500).send({ message: err.message });
      });
    });
};

exports.create = (req, res) => {
  const userBody = req.body.user;
  const { email, password, name, lastName, language } = userBody;
  const data = {
    email,
    password,
    name,
    lastName,
    language
  };

  userProvider.findUserByEmail(email)
    .then(exist => {
      if (exist) {
        res.send({ error: "email_already_exist" });
      } else {
        userProvider.create(data)
          .then(user => {
            tokenProvider.create(user).then(dataToken => {
              emailService.sendConfirmation(user, dataToken, req.headers.host).then(data => {
                res.send();
              }).catch(err => {
                res.send({ error: "email_not_sent" });
              });
            }).catch(err => {
              res.status(500)
                .send({ message: err.message });
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          });
      }
    }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    });
  });
};

exports.findOne = (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  userProvider.findUserByEmail(email).then(user => {
    if (!user) {
      res.status(404).send({ error: "email_doesnt_exist" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        if (!user.isVerified || user.isBlocked) return res.status(403).send({ message: "Your account has not been verified." });
        let token = jwt.sign(
          { user, },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME });
        user["token"] = token;
        res.send({ user, token: token });
      } else {
        res.status(401).send({ message: "Invalid email or password" });
      }
    }
  })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User" });
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
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.update = (req, res) => {
  const deleteUserId = req.params.id;
  const { user } = req.body;
  userProvider.update(deleteUserId, user).then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update User with id=${deleteUserId}. Maybe User was not found!`
      });
    } else {
      res.send({
        message: "User was updated successfully!"
      });
    }
  }).catch(() => {
    res.status(500).send({
      message: "Could not delete User with id=" + deleteUserId
    });
  });
};

exports.delete = (req, res) => {
  const userId = req.params.id;

  if (req.role !== "ROOT") {
    res.status(403).send({ message: "Forbidden" });
    return;
  }

  userProvider.delete(userId)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`
        });
      } else {
        res.send({
          message: "Answer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Answer with id=" + id
      });
    });
};
