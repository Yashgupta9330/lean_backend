// issue.model.js

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
