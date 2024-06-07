const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createError(401, "Authentication failed");
    }

    req.user = user;
    next();
  } catch (err) {
    next(createError(401, "Authentication failed"));
  }
};
