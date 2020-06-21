module.exports = app => {
  const refresh = require("../controllers/token.controller.js");
  const router = require("express").Router();
  router.post("/refresh", refresh.create);
  router.post("/revoke", refresh.delete);
  app.use("/api/token", router);
};
