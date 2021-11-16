const jwt = require("jsonwebtoken");

exports.isAdmin = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role !== "admin") {
      return res.status(403).send("authorization error");
    }
  } catch (err) {
    return res.status(401).send("authentication error");
  }
  next();
};
