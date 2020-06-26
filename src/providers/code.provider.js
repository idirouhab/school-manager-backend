const db = require("../models");
const Code = db.code;

exports.create = (user) => {
  const codeNumber = Math.floor(1000 + (Math.random() * 9000));
  const data = { userId: user.id, code: codeNumber };
  const code = new Code(data);
  return code
    .save(code);
};

exports.findOne = (userId, code) => {
  return Code.findOne({ userId, code });
};

exports.update = (id, data) => {
  return Code.findByIdAndUpdate(
    id,
    data,
    { useFindAndModify: false },
  );
};
