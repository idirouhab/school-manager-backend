const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userProvider = require('../providers/user.provider')

exports.create = (req, res) => {
    const userBody = req.body.user;
    const username = userBody.username;
    const password = userBody.password;
    const name = userBody.name;
    const lastName = userBody.lastName;
    const user = new User({
        username,
        password: bcrypt.hashSync(password, 10),
        name,
        lastName,
    });
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
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
                        {expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME});
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

exports.findAll = (req, res) =>{
    console.log(req.role)
    if(req.role !=='ROOT'){
        res.status(403).send({message: "Forbidden"});
        return
    }

    userProvider.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.delete = (req, res) => {
    const userId = req.params.id;


    if(req.role !=='ROOT'){
        res.status(403).send({message: "Forbidden"});
        return
    }

    userProvider.delete(userId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`
                });
            } else {
                res.send({
                    message: "Answer was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Answer with id=" + id
            });
        });
};
