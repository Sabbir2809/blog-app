// Dependencies
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const {
  getAllBlogsController,
  getBlogByIdController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require('../controllers/blogController');

// API Routing End Point:

// @User Routing
router.post('/user/register', register);
router.post('/user/login', login);

// @Blog Routing
router.get('/blog/all-blog', getAllBlogsController);
router.get('/blog/get-blog/:id', getBlogByIdController);
router.post('/blog/create-blog', createBlogController);
router.put('/blog/update-blog/:id', updateBlogController);
router.delete('/blog/delete-blog/:id', deleteBlogController);
router.get('/blog/user-blog/:id', userBlogController);

// Exports
module.exports = router;
