const {verifyToken} = require("../config/auth.middleware");


module.exports = app => {
    const folder = require("../controllers/folder.controller.js");

    const router = require("express").Router();

    router.post("/", [verifyToken], folder.create);
    router.get("/:id", [verifyToken], folder.findOne);
    router.get("/", [verifyToken], folder.findAll);

    app.use('/api/folder', router);
};
