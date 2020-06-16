const {verifyToken,verifyRoot} = require("../config/auth.middleware");

module.exports = app => {
    const document = require("../controllers/document.controller.js");
    const router = require("express").Router();

    router.get("/:documentName", [verifyToken, verifyRoot], document.findAll);
    router.get("/:documentName/:id", [verifyToken, verifyRoot], document.findOne);
    router.put("/:documentName/:id", [verifyToken, verifyRoot], document.update);
    app.use('/api/document', router);
};
