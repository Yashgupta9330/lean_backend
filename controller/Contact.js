const Contact = require('../models/Contact');

// Function to create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;
    const newContact = new Contact({ name, email, phone, query });
    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};