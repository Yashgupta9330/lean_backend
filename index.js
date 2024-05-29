const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.REACT_APP_BASE_URL // frontend URL
}));

// Import your controllers
const { signup, login } = require("./controller/Auth");
const { createContact } = require("./controller/Contact");
const { createFeedback } = require("./controller/Feedback");
const { createSuggestion } = require("./controller/Suggestion");
const { createIssue } = require("./controller/Issue");

// Routes
app.post("/signup", signup);
app.post("/login", login);

// Contact routes
app.post("/contact", createContact);

// Feedback routes
app.post("/feedback", createFeedback);

// Suggestion routes
app.post("/suggestion", createSuggestion);

// Issue routes
app.post("/issue", createIssue);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server....'
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
