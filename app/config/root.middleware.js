const jwt = require("jsonwebtoken");

verifyRoot = (req, res, next) => {
    const role = req.role;
    if (role !== "ROOT") {
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
    next();
};

module.exports = {
    verifyRoot: verifyRoot,
};
