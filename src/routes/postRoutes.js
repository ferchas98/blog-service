const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

router.post("/posts", auth, postController.createPost);
router.get("/posts", postController.getPosts);
router.patch("/posts/:id", auth, postController.updatePost);
router.delete("/posts/:id", auth, postController.deletePost);

module.exports = router;
