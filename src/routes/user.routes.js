const { verifyToken, verifyRoot } = require("../middleware/auth.middleware");

module.exports = app => {
  const login = require("../controllers/login.controller.js");
  const router = require("express").Router();
  router.delete("/:id", [verifyToken, verifyRoot], login.delete);
  router.put("/:id", [verifyToken, verifyRoot], login.update);
  router.get("/", [verifyToken, verifyRoot], login.findAll);
  router.post('/forget-password', login.forget);
  router.post('/reset-password', login.reset);
  app.use("/api/user", router);
};
