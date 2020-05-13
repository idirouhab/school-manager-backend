const db = require("../models");
const Questionnaire = db.questionnaire;

// Create and Save a new Questionnaire
exports.create = (req, res) => {
    // Validate request
    // Create a Tutorial


    const questionnaire = new Questionnaire(req.body.questionnaire);

    // Save Tutorial in the database
    questionnaire
        .save(questionnaire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Questionnaire."
            });
        });

};

// Retrieve all Questionnaire from the database.
exports.findAll = (req, res) => {
    Questionnaire.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


// Find a single Questionnaire with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Questionnaire.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Questionnaire with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Questionnaire with id=" + id});
        });
};


// Update a Questionnaire by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    Questionnaire.findByIdAndUpdate(id, req.body.questionnaire, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Questionnaire with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Questionnaire was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Questionnaire with id=" + id
            });
        });
};

// Delete a Questionnaire with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Questionnaire.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Questionnaire with id=${id}. Maybe Questionnaire was not found!`
                });
            } else {
                res.send({
                    message: "Questionnaire was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Questionnaire with id=" + id
            });
        });
};

// Delete all Questionnaire from the database.
exports.deleteAll = (req, res) => {

};

// Find all Questionnaire Tutorials
exports.findAllPublished = (req, res) => {

};