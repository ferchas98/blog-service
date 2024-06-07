const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(400, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw createError(404, "User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
