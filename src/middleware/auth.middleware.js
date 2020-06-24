const jwt = require("jsonwebtoken");
const newrelic = require("newrelic");

const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    newrelic.addCustomAttributes({
      middleware: "token",
      isAuthorized: false,
    });
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  let token = authHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded;

    newrelic.addCustomAttributes({
      userId: decoded.id,
      name: decoded.name,
      middleware: "token",
      isAuthorized: true,
    });
    next();
  });
};

const verifyRoot = (req, res, next) => {
  const role = req.user.role;
  if (role !== "ROOT") {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyRoot,
};
