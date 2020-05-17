const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


// Create and Save a new Questionnaire
exports.create = (req, res) => {
    const userBody = req.body.user;
    const username = userBody.username;
    const password = userBody.password;
    const name = userBody.name;
    const lastName = userBody.lastName;
    console.log(userBody)
    const user = new User({
        username,
        password: bcrypt.hashSync(password, 10),
        name,
        lastName,
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
                    let token = jwt.sign(
                        {user: data},
                        process.env.JWT_SECRET,
                        {expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME})
                    data['token'] = token;
                    res.send({user: data, token: token})
                } else {
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
