// feedback.controller.js

const Feedback = require('../models/Feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { email, message, isAnonymous } = req.body;

    // Check if the feedback is anonymous and handle accordingly
    if (isAnonymous) {
      // If feedback is anonymous, do not require name and email
      const feedback = await Feedback.create({ message, isAnonymous: true });
      return res.status(201).json({ success: true, feedback });
    } else {
      // If feedback is not anonymous, require name and email
      if (!email) {
        return res.status(400).json({ success: false, message: 'email are required for non-anonymous feedback' });
      }
      const feedback = await Feedback.create({ email, message });
      return res.status(200).json({ success: true, feedback });
    }
  } catch (error) {
    console.error('Error creating feedback:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
