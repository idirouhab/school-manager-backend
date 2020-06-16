const {verifyToken} = require("../config/auth.middleware");

module.exports = app => {
    const event = require("../controllers/event.controller.js");

    const router = require("express").Router();

    router.post("/", [verifyToken], event.create);

    router.get("/", [verifyToken], event.findAll);

    router.get("/:id", event.findOne);

    router.delete("/", [verifyToken], event.delete);

    app.use('/api/event', router);
};
