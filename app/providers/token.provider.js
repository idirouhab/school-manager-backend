const db = require("../models");
const Token = db.token;

exports.create = (data) => {
  const token = new Token(data);
  return token
    .save(token);
};

exports.findOne = (token) => {
  return Token.findOne({ "token": token });
};

exports.update = (id, data) => {
  return Token.findByIdAndUpdate(
    id,
    data,
    { useFindAndModify: false }
  );
};
