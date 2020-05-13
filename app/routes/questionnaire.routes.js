module.exports = app => {
    const questionnaire = require("../controllers/questionnaire.controller.js");

    var router = require("express").Router();

    // Create a new Questionnaire
    router.post("/", questionnaire.create);

    // Retrieve all Questionnaire
    router.get("/", questionnaire.findAll);

    // Retrieve all published Questionnaire
    router.get("/published", questionnaire.findAllPublished);

    // Retrieve a single Questionnaire with id
    router.get("/:id", questionnaire.findOne);

    // Update a Questionnaire with id
    router.put("/:id", questionnaire.update);

    // Delete a Questionnaire with id
    router.delete("/:id", questionnaire.delete);

    // Create a new Questionnaire
    router.delete("/", questionnaire.deleteAll);

    app.use('/api/questionnaire', router);
};
