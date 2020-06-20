const db = require('../models');
const Token = db.token;
const crypto = require('crypto');

exports.create = (user) => {
  const data = { userId: user.id, token: crypto.randomBytes(16).toString('hex') };
  const token = new Token(data);
  return token
    .save(token);
};

exports.findOne = (token) => {
  return Token.findOne({ token: token });
};

exports.update = (id, data) => {
  return Token.findByIdAndUpdate(
    id,
    data,
    { useFindAndModify: false },
  );
};
