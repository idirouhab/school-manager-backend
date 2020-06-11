const db = require("../models");
const Exam = db.exam;
const User = db.user;
const bcrypt = require("bcryptjs");

exports.create = (data) => {
  const user = new User({
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    name: data.name,
    lastName: data.lastName,
    language: data.language
  });

  return user.save(user);
};

exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
};

exports.findUserByExamId = (id) => {
  return Exam.findById(id).populate("userId", ["name", "email"]);
};

exports.findAll = () => {
  return User.find({}, { password: 0 });
};

exports.findOne = (id) => {
  return User.findById((id), { password: 0 });

};

exports.update = (id, user) => {
  return User.findByIdAndUpdate(
    id,
    user,
    { useFindAndModify: false }
  );
};

exports.delete = (id) => {
  return User.findByIdAndRemove(id);
};
