const Post = require("../models/Post");
const createError = require("http-errors");

exports.createPost = async (req, res, next) => {
  try {
    const { title, image, body } = req.body;
    const post = new Post({ title, image, body, user: req.user._id });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search ? { title: new RegExp(search, "i") } : {};
    const posts = await Post.find(query).populate("user");
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, image, body } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== req.user._id) {
      throw createError(403, "You are not authorized to edit this post");
    }

    post.title = title || post.title;
    post.image = image || post.image;
    post.body = body || post.body;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== req.user._id) {
      throw createError(403, "You are not authorized to delete this post");
    }

    await post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
