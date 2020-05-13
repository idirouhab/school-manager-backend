const db = require("../models");
const bcrypt = require("bcryptjs")
const User = db.user;

// Create and Save a new Questionnaire
exports.create = (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const user = new User({
        username,
        password: bcrypt.hashSync(password, 10)
    });
    // Save Tutorial in the database
    user
        .save(user)
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

// Find a single User with an id
exports.findOne = (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    User.findOne({username})
        .then(data => {
            if (!data) {
                res.status(404).send({message: "Not found User"});
            } else {
                if (bcrypt.compareSync(password, data.password)) {
                    res.send(data)
                }else{
                    res.status(403).send({message: "Forbidden"});
                }
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving User"});
        });
};
