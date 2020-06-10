const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
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
    next();
  });
};

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
  verifyToken,
  verifyRoot,
};
