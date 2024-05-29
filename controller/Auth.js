const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup controller
exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { Name, email, password, confirmPassword, image} = req.body;
    
    // Check if All Details are there or not
    if (!email || !password || !confirmPassword || !Name) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

   

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      Name,
      email,
      password: hashedPassword,
      image: image ? image : `https://api.dicebear.com/5.x/initials/svg?seed=${Name}`,
    });

    // Generate JWT token for the user
    const token = user.generateAuthToken();

    // Save the user document
    await user.save();

   

    const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User registered successfully`,
    });

  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


// Login controller for authenticating users
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email });

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = user.generateAuthToken();
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} 
        else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};


