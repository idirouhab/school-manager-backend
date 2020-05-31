const {verifyToken} = require("../config/auth.middleware");

module.exports = app => {
    const document = require("../controllers/document.controller.js");
    const router = require("express").Router();

    router.get("/:documentName", [verifyToken], document.findAll);
    router.get("/:documentName/:id", [verifyToken], document.findOne);

    app.use('/api/document', router);
};
