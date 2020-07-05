const { multerService } = require("../services/multer.service");
const { verifyToken, verifyRoot } = require("../middleware/auth.middleware");

module.exports = app => {
  const image = require("../controllers/image.controller.js");
  const router = require("express").Router();
  router.post("/", [verifyToken, multerService().single("image")], image.create);
  router.delete("/:id", [verifyToken], image.delete);
  router.get("/:id", image.findOne);
  router.get("/", [verifyToken, verifyRoot], image.findAll);
  app.use("/api/image", router);
};
