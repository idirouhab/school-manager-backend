const { verifyToken } = require("../middleware/auth.middleware");
const { check } = require("express-validator");

module.exports = app => {
  const exam = require("../controllers/exam.controller.js");
  const router = require("express").Router();
  router.post("/", [
    verifyToken,
    check("text").not().isEmpty(),
    check("folderId").not().isEmpty()
  ], exam.create);

  router.get("/", [verifyToken], exam.findAll);
  router.get("/:id", exam.findOne);
  router.put("/:id", [verifyToken], exam.update);
  router.delete("/:id", [verifyToken], exam.delete);
  app.use("/api/exam", router);
};
