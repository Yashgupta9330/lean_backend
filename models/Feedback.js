// feedback.model.js

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false // Name is not required for anonymous feedback
  },
  email: {
    type: String,
    required: false // Email is not required for anonymous feedback
  },
  message: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
