// Dependencies
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
// Model
const userModel = mongoose.model('User', userSchema);

// Export
module.exports = userModel;
