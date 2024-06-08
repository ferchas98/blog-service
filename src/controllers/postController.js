const Post = require("../models/Post");
const createError = require("http-errors");

// Create new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, image, body } = req.body;
    const newPost = new Post({
      title,
      image,
      body,
      user: req.user.id,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const searchQuery = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};

    const posts = await Post.find(searchQuery).populate(
      "user",
      "name profilePic"
    );
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, image, body } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      throw createError(403, "Forbidden");
    }

    post.title = title || post.title;
    post.image = image || post.image;
    post.body = body || post.body;
    post.updated_at = Date.now();

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      throw createError(403, "Forbidden");
    }

    await post.remove();

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
