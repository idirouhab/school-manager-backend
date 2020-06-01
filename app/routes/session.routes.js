const {verifyToken, verifyRoot} = require("../config/auth.middleware");

module.exports = app => {
    const session = require("../controllers/session.controller.js");
    const router = require("express").Router();

    router.post("/", [verifyToken], session.create);

    router.get("/", [verifyToken, verifyRoot], session.findAll);

    app.use('/api/session', router);
};
