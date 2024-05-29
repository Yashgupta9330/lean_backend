require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
      Name: {
      type: String,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
);

// Method to generate JWT token for user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
     process.env.JWT_SECRET,
    {
      expiresIn: "1d", // Token expiration time set to 1 day
    }
  );
  return token;
};

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);