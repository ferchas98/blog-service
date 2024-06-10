const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("token", "");
  if (!token) {
    return next(createError(401, "Access denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    next(createError(400, "Invalid token."));
  }
};
