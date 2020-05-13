module.exports = app => {
    const login = require("../controllers/login.controller.js");

    var router = require("express").Router();

    // Create a new Questionnaire
    router.post("/", login.create);

    // Retrieve a single User with id
    router.get("/", login.findOne);

    app.use('/login', router);
};