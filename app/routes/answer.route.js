const {verifyToken} = require("../config/auth.middleware");


module.exports = app => {
    const answer = require("../controllers/answer.controller.js");

    const router = require("express").Router();

    router.post("/", answer.create);
    router.get("/:id", [verifyToken], answer.findAll);

    app.use('/api/answer', router);
};
