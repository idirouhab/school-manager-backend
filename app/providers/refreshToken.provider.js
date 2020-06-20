const db = require('../models');
const RefreshToken = db.refreshToken;

exports.create = (userId, refreshToken) => {
  const data = { userId, refreshToken };
  const token = new RefreshToken(data);
  return token
    .save(token);
};

exports.findOne = (refreshToken) => {
  return RefreshToken
    .findOne({ refreshToken: refreshToken });
};

exports.findByUser = (userId) => {
  return RefreshToken
    .findOne({ userId });
};

exports.update = (id, data) => {
  return RefreshToken
    .findByIdAndUpdate(
      id,
      data,
      { useFindAndModify: false },
    );
};
