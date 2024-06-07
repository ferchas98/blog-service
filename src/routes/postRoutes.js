const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, postController.createPost);
router.get("/", postController.getAllPosts);
router.patch("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
