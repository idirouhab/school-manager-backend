import * as jwt from "jsonwebtoken";
import  * as  newrelic from "newrelic";

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    newrelic.addCustomAttributes({
      "middleware": "token",
      "isAuthorized": false
    });
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.user.id;
    req.role = decoded.user.role;
    newrelic.addCustomAttributes({
      "userId": decoded.user.id,
      "name": decoded.user.name,
      "middleware": "token",
      "isAuthorized": true
    });
    next();
  });
};

verifyRoot = (req, res, next) => {
  const role = req.role;
  newrelic.addCustomAttributes({
    "userId": req.userId,
    "middleware": "root",
    "isRoot": role !== "ROOT"

  });
  if (role !== "ROOT") {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyRoot,
};
