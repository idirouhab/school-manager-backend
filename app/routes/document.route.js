const {verifyRoot} = require("../config/root.middleware");
const {verifyToken} = require("../config/auth.middleware");

module.exports = app => {
    const document = require("../controllers/document.controller.js");
    const router = require("express").Router();

    router.get("/:documentName", [verifyToken, verifyRoot], document.findAll);
    router.get("/:documentName/:id", [verifyToken, verifyRoot], document.findOne);

    app.use('/api/document', router);
};
