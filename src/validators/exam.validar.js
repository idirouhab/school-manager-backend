const { check } = require("express-validator");

module.exports = {
  create: [
    check("text").not().isEmpty(),
    check("folderId").not().isEmpty()
  ]
};
