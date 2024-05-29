// suggestion.model.js

const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
