const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.register);
router.get("/:id", userController.getUserById);

module.exports = router;