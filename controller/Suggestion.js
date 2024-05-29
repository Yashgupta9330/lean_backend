const Suggestion = require('../models/Suggestion');

// Create a new suggestion
exports.createSuggestion = async (req, res) => {
  try {
    const { description, section, email } = req.body;
    const newSuggestion = new Suggestion({
      description,
      section,
      email
    });
    const savedSuggestion = await newSuggestion.save();
    res.status(201).json(savedSuggestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};