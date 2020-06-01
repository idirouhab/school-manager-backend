const db = require("../models");
const Session = db.session;

exports.create = (data) => {
    const session = new Session(data);
    return session
        .save(session)
};

exports.findAll = () => {
    return Session.find({});
};
