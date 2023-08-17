const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

// Fetching all blog posts
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    // Validation
    if (!blogs) {
      return res.status(400).send({ success: false, message: 'No Blogs Found' });
    }

    // Successfully Response
    res.status(200).send({
      success: true,
      blogCount: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Fetching a single blog post by ID
exports.getBlogByIdController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    // Validation
    if (!blog) {
      return res.status(400).send({ success: false, message: 'Blog Not Found with this Id' });
    }
    // Successfully Response
    res.status(200).send({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Creating a new blog post
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({ success: false, message: 'Please Provide All Fields' });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(400).send({ success: false, message: 'Unable to find user' });
    }

    // create blog
    const newBlog = new blogModel({ title, description, image, user });

    // session
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    // Successfully Response
    res.status(200).send({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Updating an existing blog post
exports.updateBlogController = async (req, res) => {
  try {
    // Update Blog Information
    const updateBlog = await blogModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

    // Successfully Response
    res.status(200).send({
      success: true,
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Deleting a blog post
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();

    // Successfully Response
    res.status(200).send({
      success: true,
      message: 'Blog Deleted Successfully',
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Get a User Blog
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs');

    // Validation
    if (!userBlog) {
      return res.status(400).send({ success: false, message: 'Blog Not Found with this Id' });
    }

    // Successfully Response
    res.status(200).send({
      success: true,
      data: userBlog,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
