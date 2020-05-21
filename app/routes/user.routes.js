const {verifyToken} = require("../config/auth.middleware");

module.exports = app => {
    const login = require("../controllers/login.controller.js");
    const router = require("express").Router();

    router.delete("/:id", [verifyToken], login.delete);

    router.get("/", [verifyToken], login.findAll);

    app.use('/api/user', router);
};
